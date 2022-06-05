import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Offer } from './offer.model';

@Entity()
export class OfferImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageData: string;

    @ManyToOne(() => Offer, offer => offer.images)
    offer: Offer;
}