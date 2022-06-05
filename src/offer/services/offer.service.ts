import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OfferInput } from '../dto/offer-input.dto';
import { OfferOutput } from '../dto/offer-output.dto';
import { UserService } from '../../user/services/user.service';
import { Offer } from '../model/offer.model';
import { UserTypeEnum } from 'src/user/constants/user-type.enum';
import { OfferCategoriesService } from './offer-categories.service';
import { OfferImagesService } from './offer-images.service';
import { OfferCharacteristicsService } from './offer-characteristics.service';
import { UserOutputDTO } from 'src/user/dtos/user-output.dto';

@Injectable()
export class OfferService {
    constructor(
        private dataSource: DataSource,
        private userService: UserService,
        private offerCategoriesService: OfferCategoriesService,
        private offerImagesService: OfferImagesService,
        private offerCharacteristicsService: OfferCharacteristicsService
    ) { }

    async save(
        contextUserID: number,
        input: OfferInput
    ): Promise<OfferOutput> {
        const seller = await this.userService
            .getUnformattedUserById(contextUserID);
        
        if (seller.userType != UserTypeEnum.SELLER) {
            throw new BadRequestException('Only a Seller can create an offer.');
        }

        const restaurant = await this.userService
            .getUnformattedUserById(input.restaurantId);

        if (restaurant.userType != UserTypeEnum.RESTAURANT) {
            throw new BadRequestException('Only a restaurant can receive an offer.');
        }

        const offerCategories = await this.offerCategoriesService
            .getOrCreate(input.categories);

        const offer = new Offer();
        offer.restaurant = restaurant;
        offer.seller = seller;
        offer.name = input.name;
        offer.price = input.price;
        offer.productionDate = input.productionDate;
        offer.categories = offerCategories;

        const offerSaved = await this.dataSource.getRepository(Offer)
            .save(offer);

        await this.offerImagesService
            .saveImagesToOffer(offerSaved, input.images);
        await this.offerCharacteristicsService
            .saveCharacteristicsToOffer(offerSaved, input.characteristics);

        return OfferOutput.fromOffer(
            (await this.dataSource.getRepository(Offer).findOneBy({ id: offerSaved.id })),
            (await UserOutputDTO.fromUser(restaurant)),
            (await UserOutputDTO.fromUser(seller))
        );
    }
}
