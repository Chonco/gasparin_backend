import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserTypeEnum } from 'src/user/constants/user-type.enum';
import { DataSource } from 'typeorm';
import { UserAccessTokenClaims } from '../../auth/dtos/user-token-claims.dto';
import { OrderInput } from '../dto/order-input.dto';
import { Order } from '../model/order.model';
import { OfferService } from './offer.service';
import { Offer } from '../model/offer.model';
import { OfferStatus } from '../constants/OfferStatus.enum';

@Injectable()
export class OrderService {
    constructor(
        private dataSource: DataSource,
        private offerService: OfferService
    ) { }

    async save(
        contextUser: UserAccessTokenClaims,
        orderInput: OrderInput
    ): Promise<Order> {
        if (contextUser.userType != UserTypeEnum.RESTAURANT)
            throw new UnauthorizedException();

        const offer = await this.offerService.getOfferById(orderInput.offerId);
        if (!offer)
            throw new BadRequestException();

        const orderToSave = new Order();
        orderToSave.quantity = orderInput.quantity;
        orderToSave.offer = offer;

        const order = await this.dataSource
            .getRepository(Order)
            .save(orderToSave);

        offer.status = OfferStatus.ACCEPTED;
        await this.dataSource.getRepository(Offer).save(offer);

        return order;
    }
}
