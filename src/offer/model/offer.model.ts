import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { OfferImage } from "./offer-images.model";
import { OfferCategory } from './offer-category.model';
import { OfferCaracteristic } from './offer-caracteristic.model';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToMany(() => OfferCategory)
    @JoinTable()
    categories: OfferCategory[];

    @OneToMany(
        () => OfferCaracteristic,
        offerCaracteristic => offerCaracteristic.offer
    )
    caracteristics: OfferCaracteristic[]
}