import { IsEnum, IsNumber, Min } from 'class-validator';
import { OfferStatus } from '../constants/OfferStatus.enum';
export class OfferStatusUpdate {
    @IsNumber()
    @Min(1)
    offerId: number;

    @IsEnum(OfferStatus)
    status: OfferStatus;
}