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

    @OneToOne(() => Offer)
    @JoinTable()
    offer: Offer;
}