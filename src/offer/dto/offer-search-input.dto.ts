import { ArrayNotEmpty, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class OfferSearchInput {
    @IsOptional()
    @IsNotEmpty()
    restaurantName: string;

    @IsOptional()
    @IsNotEmpty()
    sellerName: string = '';

    @IsOptional()
    @IsNotEmpty()
    name: string = '';

    @IsOptional()
    @IsString({ each: true })
    @ArrayNotEmpty()
    categories: string[]

    @IsInt()
    @Min(0)
    currentPage: number = 0;

    @IsInt()
    @Min(0)
    perPage: number;
}