import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Offer } from "./offer.model";

@Entity()
export class OfferCaracteristic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    value: string;

    @ManyToOne(() => Offer, offer => offer.caracteristics)
    offer: Offer;
}