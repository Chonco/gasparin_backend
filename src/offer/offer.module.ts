import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferController } from './controllers/offer.controller';
import { Offer } from './model/offer.model';
import { OfferImage } from './model/offer-images.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferCategory } from './model/offer-category.model';
import { OfferCaracteristic } from './model/offer-caracteristic.model';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Offer,
        OfferImage,
        OfferCategory,
        OfferCaracteristic
      ])
  ],
  providers: [OfferService],
  controllers: [OfferController]
})
export class OfferModule { }
