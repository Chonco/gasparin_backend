import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Characteristic } from '../dto/offer-input.dto';
import { OfferCharacteristic } from '../model/offer-characteristic.model';
import { Offer } from '../model/offer.model';

@Injectable()
export class OfferCharacteristicsService {
    constructor(private dataSource: DataSource) { }
    
    async saveCharacteristicsToOffer(
        offer: Offer,
        characteristics: Characteristic[]
    ): Promise<OfferCharacteristic[]> {
        const savedCharacteristics: OfferCharacteristic[] = [];
        const repository = this.dataSource.getRepository(OfferCharacteristic);

        for (let index = 0; index < characteristics.length; index++) {
            const characteristic = characteristics[index];
            
            const offerCharacteristic = new OfferCharacteristic();
            offerCharacteristic.name = characteristic.key;
            offerCharacteristic.value = characteristic.value;
            offerCharacteristic.offer = offer;

            savedCharacteristics.push(
                await repository.save(offerCharacteristic)
            );
        }

        return savedCharacteristics;
    }
}
