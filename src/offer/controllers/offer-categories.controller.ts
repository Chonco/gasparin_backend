import { Controller, Get } from '@nestjs/common';
import { OfferCategory } from '../model/offer-category.model';
import { OfferCategoriesService } from '../services/offer-categories.service';

@Controller('offer-categories')
export class OfferCategoriesController {
    constructor(private service: OfferCategoriesService) { }
    
    @Get()
    async getAll(): Promise<OfferCategory[]> {
        return await this.service.getAll();
    }
}
