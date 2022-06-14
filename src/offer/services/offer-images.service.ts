import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OfferImage } from '../model/offer-images.model';
import { Offer } from '../model/offer.model';

@Injectable()
export class OfferImagesService {
    constructor(private dataSource: DataSource) { }
    
    async saveImagesToOffer(
        offer: Offer,
        images: string[]
    ): Promise<OfferImage[]> {
        const imagesSaved: OfferImage[] = [];
        const repository = this.dataSource.getRepository(OfferImage);

        for (let index = 0; index < images.length; index++) {
            const image = images[index];
            
            const offerImage = new OfferImage();
            offerImage.imageData = image;
            offerImage.offer = offer;

            imagesSaved.push(await repository.save(offerImage));
        }

        return imagesSaved;
    }
}
