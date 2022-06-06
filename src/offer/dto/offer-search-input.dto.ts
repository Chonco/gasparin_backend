import { ArrayNotEmpty, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

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

    @IsInt()
    @Min(0)
    currentPage: number = 0;

    @IsInt()
    @Min(0)
    perPage: number;

    @IsOptional()
    @IsBoolean()
    openOffers: boolean = false;
}