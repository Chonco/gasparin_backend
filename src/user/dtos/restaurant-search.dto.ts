export class RestaurantSearchDTO {
    name: string;
    currentPage: number;
    perPage = 5;
    foodType: string[];
}