import { IsInt, Min } from 'class-validator';

export class OrderInput {
    @IsInt()
    @Min(1)
    sellerId: number;

    @IsInt()
    @Min(1)
    offerId: number;

    @IsInt()
    @Min(1)
    quantity: number;
}