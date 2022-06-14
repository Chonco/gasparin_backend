import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferController } from './controllers/offer.controller';
import { Offer } from './model/offer.model';
import { OfferImage } from './model/offer-images.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferCategory } from './model/offer-category.model';
import { UserModule } from '../user/user.module';
import { OfferImagesService } from './services/offer-images.service';
import { OfferCategoriesService } from './services/offer-categories.service';
import { OfferCategoriesController } from './controllers/offer-categories.controller';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { Order } from './model/order.model';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature(
      [
        Offer,
        OfferImage,
        OfferCategory,
        Order
      ])
  ],
  providers: [
    OfferService,
    OfferImagesService,
    OfferCategoriesService,
    OrderService
  ],
  controllers: [OfferController, OfferCategoriesController, OrderController]
})
export class OfferModule { }
