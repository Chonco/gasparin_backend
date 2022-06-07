import { Controller, HttpCode, Post, HttpStatus, Body, Get, Param, Delete } from '@nestjs/common';
import { ReqContext } from 'src/shared/request-context/request-context.decorator';
import { ReviewInput } from '../dtos/review-input.dto';
import { ReviewOutput } from '../dtos/review-output.dto';
import { ReviewService } from '../services/review.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';

@Controller('review')
export class ReviewController {
    constructor(private service: ReviewService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @ReqContext() context: RequestContext,
        @Body() input: ReviewInput
    ): Promise<ReviewOutput> {
        return await this.service.add(context.user, input);
    }

    @Get(':toId')
    @HttpCode(HttpStatus.OK)
    async getAllOfTo(
        @Param('toId') toId: number
    ): Promise<ReviewOutput[]> {
        return await this.service.getOfTo(toId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async deleteById(@Param('id') id: number) {
        await this.service.deleteById(id);
    }
}
