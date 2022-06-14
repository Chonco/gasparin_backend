import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
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

    @OneToOne(() => Offer, offer => offer.order)
    @JoinColumn()
    offer: Offer;

    @CreateDateColumn()
    createdAt: Date;
}