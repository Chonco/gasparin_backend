import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Review } from '../model/review.model';
import { User } from '../../user/models/user.model';

export class ReviewInput {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;

    @IsNumber()
    @Max(10)
    @Min(1)
    score: number;

    @IsNumber()
    @Min(1)
    idTo: number;

    static toEntity(input: ReviewInput, from: User, to: User): Review {
        const review = new Review()

        review.title = input.title
        review.body = input.body;
        review.score = input.score;
        review.from = from;
        review.to = to;

        return review;
    }
}