import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FoodType } from '../models/food-type.model';

@Injectable()
export class FoodTypeService {
    constructor(private dataSource: DataSource) { }

    async getAll(): Promise<FoodType[]> {
        return (await this.dataSource.getRepository(FoodType)
            .find()
        );
    }

    async getOrCreate(name: string) {
        const foodType = await this.dataSource.getRepository(FoodType)
            .findOneBy({ name });

        if (!foodType) {
            const savedFoodType = new FoodType();
            savedFoodType.name = name;

            return await this.dataSource.getRepository(FoodType)
                .save(savedFoodType);
        }

        return foodType;
    }
}
