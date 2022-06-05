import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min, ValidateNested, } from "class-validator";

export class Characteristic {
    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    value: string;
}

export class OfferInput {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(0.1)
    price: number;

    @IsDate()
    productionDate: Date;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    images: string[];

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    categories: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Characteristic)
    characteristics: Characteristic[];

    @IsInt()
    @IsPositive()
    restaurantId: number;
}