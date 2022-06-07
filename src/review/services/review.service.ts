import { Injectable, BadRequestException } from '@nestjs/common';
import { UserAccessTokenClaims } from '../../auth/dtos/user-token-claims.dto';
import { ReviewInput } from '../dtos/review-input.dto';
import { ReviewOutput } from '../dtos/review-output.dto';
import { DataSource } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { Review } from '../model/review.model';

@Injectable()
export class ReviewService {
    constructor(
        private dataSource: DataSource,
        private userService: UserService
    ) { }

    async add(
        contextUser: UserAccessTokenClaims,
        input: ReviewInput
    ): Promise<ReviewOutput> {
        const from = await this.userService.getUnformattedUserById(contextUser.id);
        const to = await this.userService.getUnformattedUserById(input.idTo);

        if (from.userType === to.userType) {
            throw new BadRequestException("Users of same type can't review each other.");
        }

        const review = ReviewInput.toEntity(input, from, to);

        return await ReviewOutput.fromEntity(
            await this.dataSource.getRepository(Review).save(review)
        );
    }

    async getOfTo(toId: number): Promise<ReviewOutput[]> {
        const reviews = await this.dataSource
            .getRepository(Review)
            .createQueryBuilder('review')
            .leftJoinAndSelect('review.from', 'from')
            .innerJoinAndSelect('review.to', 'to', 'to.id = :id', { id: toId })
            .getMany();

        const parsedReviews: ReviewOutput[] = [];
        for (let index = 0; index < reviews.length; index++) {
            const review = reviews[index];

            parsedReviews.push(
                await ReviewOutput.fromEntity(review)
            );
        }

        return parsedReviews;
    }

    async deleteById(id: number) {
        await this.dataSource.getRepository(Review).delete(id);
    }
}
