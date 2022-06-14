import {
    IsInt,
    Min,
    IsOptional,
    IsString
} from 'class-validator';

export class RestaurantSearchDTO {

    @IsOptional()
    @IsString()
    name: string = "";

    @IsInt()
    @Min(0)
    currentPage: number;

    @IsInt()
    @Min(0)
    perPage = 5;

    @IsOptional()
    @IsString({ each: true })
    foodType: string[] = [];
}