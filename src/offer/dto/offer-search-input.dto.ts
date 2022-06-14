import { ArrayNotEmpty, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { OfferStatus } from '../constants/OfferStatus.enum';

export class OfferSearchInput {
    @IsOptional()
    @IsString()
    restaurantName: string = '';

    @IsOptional()
    @IsString()
    sellerName: string = '';

    @IsOptional()
    @IsString()
    name: string = '';

    @IsOptional()
    @IsString({ each: true })
    categories: string[] = [];

    @IsOptional()
    @IsEnum(OfferStatus)
    status: OfferStatus;

    @IsInt()
    @Min(0)
    currentPage: number = 0;

    @IsInt()
    @Min(0)
    perPage: number;
}