import {
    Column,
    Entity,
    JoinTable,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Offer } from "./offer.model";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    orderDate: Date;

    @Column()
    deliveryDate: Date;

    @OneToOne(
        () => Offer,
        offer => offer.order,
        { nullable: false }
    )
    @JoinTable()
    offer: Offer;
}