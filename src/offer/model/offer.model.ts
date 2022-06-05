import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    ManyToOne
} from 'typeorm';
import { OfferImage } from "./offer-images.model";
import { OfferCategory } from './offer-category.model';
import { OfferCharacteristic } from './offer-characteristic.model';
import { User } from '../../user/models/user.model';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.incomingOffer)
    restaurant: User;

    @ManyToOne(() => User, user => user.offeredOffer)
    seller: User;

    @Column()
    name: string;

    @Column("double")
    price: number;

    @Column()
    productionDate: Date;

    @OneToMany(
        () => OfferImage,
        image => image.offer,
        { eager: true }
    )
    images: OfferImage[];

    @ManyToMany(() => OfferCategory, { eager: true })
    @JoinTable()
    categories: OfferCategory[];

    @OneToMany(
        () => OfferCharacteristic,
        offerCharacteristic => offerCharacteristic.offer,
        { eager: true }
    )
    characteristics: OfferCharacteristic[]
}