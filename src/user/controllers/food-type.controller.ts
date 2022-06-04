import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { FoodType } from '../models/food-type.model';
import { FoodTypeService } from '../services/food-type.service';

@Controller('food-type')
export class FoodTypeController {
    constructor(private service: FoodTypeService) { }
    
    @Get()
    @HttpCode(HttpStatus.OK) 
    async getAll(): Promise<FoodType[]> {
        return await this.service.getAll();
    }
}
