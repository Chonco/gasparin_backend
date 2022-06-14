import {
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Min
} from "class-validator";

export class OfferInput {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(0.1)
    price: number;

    @IsDateString()
    productionDate: Date;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    images: string[];

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    categories: string[];

    @IsNotEmpty()
    description: string

    @IsInt()
    @IsPositive()
    restaurantId: number;
}