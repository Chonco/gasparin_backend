import { Module } from '@nestjs/common';
import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './model/review.model';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule { }
