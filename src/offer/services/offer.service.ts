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
import { UserAccessTokenClaims } from '../../auth/dtos/user-token-claims.dto';
import { OfferSearchInput } from '../dto/offer-search-input.dto';

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
            (
                await this.dataSource.getRepository(Offer)
                    .findOneBy({ id: offerSaved.id })
            ),
            (await UserOutputDTO.fromUser(restaurant)),
            (await UserOutputDTO.fromUser(seller))
        );
    }

    async getFilteredOffers(
        contextUser: UserAccessTokenClaims,
        searchCriteria: OfferSearchInput
    ): Promise<OfferOutput[]> {
        return contextUser.userType == UserTypeEnum.RESTAURANT
            ? this.getFilteredOffersOfRestaurant(contextUser.id, searchCriteria)
            : this.getFilteredOffersOfSeller(contextUser.id, searchCriteria);
    }

    private async getFilteredOffersOfRestaurant(
        restaurantId: number,
        searchCriteria: OfferSearchInput
    ): Promise<OfferOutput[]> {
        const query = this.dataSource.getRepository(Offer)
            .createQueryBuilder('offer')
            .innerJoinAndSelect('offer.restaurant', 'restaurant', 'restaurant.id = :id', { id: restaurantId })
            .leftJoinAndSelect('offer.seller', 'seller')
            .leftJoinAndSelect('offer.categories', 'category')
            .leftJoinAndSelect('offer.images', 'image')
            .leftJoinAndSelect('offer.characteristics', 'characteristic')
            .leftJoinAndSelect('offer.order', 'order');

        query
            .where('offer.offerAccepted = :openOffers', { openOffers: !searchCriteria.openOffers })
            .andWhere(`(offer.name LIKE :offerName AND seller.name LIKE :sellerName)`, {
                offerName: `%${searchCriteria.name}%`,
                sellerName: `%${searchCriteria.sellerName}%`
            });

        if (searchCriteria.categories.length) {
            query.andWhere(`category.name IN (:...categoriesNames)`, {
                categoriesNames: searchCriteria.categories
            });
        }

        const offers = await query
            .skip(searchCriteria.currentPage * searchCriteria.perPage)
            .take(searchCriteria.perPage)
            .getMany();

        return this.getOffersAsOutputs(offers);
    }

    private async getFilteredOffersOfSeller(
        sellerId: number,
        searchCriteria: OfferSearchInput
    ): Promise<OfferOutput[]> {
        const query = this.dataSource.getRepository(Offer)
            .createQueryBuilder('offer')
            .leftJoinAndSelect('offer.restaurant', 'restaurant')
            .innerJoinAndSelect('offer.seller', 'seller', 'seller.id = :id', { id: sellerId })
            .leftJoinAndSelect('offer.categories', 'category')
            .leftJoinAndSelect('offer.images', 'images')
            .leftJoinAndSelect('offer.characteristics', 'characteristics')
            .leftJoinAndSelect('offer.order', 'order');

        query
            .where('offer.offerAccepted = :openOffers', { openOffers: !searchCriteria.openOffers })
            .andWhere(`(offer.name LIKE :offerName AND restaurant.name LIKE :restaurantName)`, {
                offerName: `%${searchCriteria.name}%`,
                restaurantName: `%${searchCriteria.restaurantName}%`
            });

        if (searchCriteria.categories.length) {
            query.andWhere(`category.name IN (:...categoriesNames)`, {
                categoriesNames: searchCriteria.categories
            });
        }

        const offers = await query
            .skip(searchCriteria.currentPage * searchCriteria.perPage)
            .take(searchCriteria.perPage)
            .getMany();

        return this.getOffersAsOutputs(offers);
    }

    private async getOffersAsOutputs(
        offers: Offer[]
    ): Promise<OfferOutput[]> {
        const offerOutputs: OfferOutput[] = [];

        for (let index = 0; index < offers.length; index++) {
            const offer = offers[index];

            offerOutputs.push(OfferOutput.fromOffer(
                offer,
                (await UserOutputDTO.fromUser(offer.restaurant)),
                (await UserOutputDTO.fromUser(offer.seller))
            ))
        }

        return offerOutputs;
    }

    async getOfferById(id: number): Promise<Offer> {
        return await this.dataSource
            .getRepository(Offer)
            .findOneBy({ id });
    }

    async deleteById(id: number) {
        await this.dataSource.getRepository(Offer)
            .delete({ id });
    }
}
