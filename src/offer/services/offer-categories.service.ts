import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OfferCategory } from '../model/offer-category.model';

@Injectable()
export class OfferCategoriesService {
    constructor(private dataSource: DataSource) { }

    async getOrCreate(names: string[]): Promise<OfferCategory[]> {
        const categories: OfferCategory[] = [];
        const repository = this.dataSource.getRepository(OfferCategory);

        for (let index = 0; index < names.length; index++) {
            const name = names[index];

            const categoryFinded = await repository.findOneBy({ name });

            if (categoryFinded) {
                categories.push(categoryFinded);
                continue;
            }

            const categoryCreated = new OfferCategory();
            categoryCreated.name = name;

            categories.push(
                (await repository.save(categoryCreated))
            );
        }

        return categories;
    }

    async getAll(): Promise<OfferCategory[]> {
        return await this.dataSource
            .getRepository(OfferCategory).find();
    }
}
