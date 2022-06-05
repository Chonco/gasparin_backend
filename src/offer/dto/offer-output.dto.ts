import { OfferCharacteristic } from "../model/offer-characteristic.model";
import { OfferCategory } from "../model/offer-category.model";
import { OfferImage } from "../model/offer-images.model";
import { UserOutputDTO } from '../../user/dtos/user-output.dto';

export class OfferOutput {
    id: number;
    name: string;
    price: number;
    productionDate: Date;
    images: OfferImage[];
    categories: OfferCategory[];
    characteristics: OfferCharacteristic[];
    restaurant: UserOutputDTO;
    seller: UserOutputDTO;
}