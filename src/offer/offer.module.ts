import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferController } from './controllers/offer.controller';
import { Offer } from './model/offer.model';
import { OfferImage } from './model/offer-images.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferCategory } from './model/offer-category.model';
import { OfferCharacteristic } from './model/offer-characteristic.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature(
      [
        Offer,
        OfferImage,
        OfferCategory,
        OfferCharacteristic
      ])
  ],
  providers: [OfferService],
  controllers: [OfferController]
})
export class OfferModule { }
