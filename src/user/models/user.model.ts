import { Column, Entity, Index, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserTypeEnum } from "../constants/user-type.enum";
import { FoodType } from './food-type.model';
import { Offer } from '../../offer/model/offer.model';
import { Review } from '../../review/model/review.model';

@Entity()
@Index('user_indexes', ['id', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    logoImg: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({ type: 'enum', enum: UserTypeEnum })
    userType: UserTypeEnum;

    @ManyToOne(
        () => FoodType,
        foodType => foodType.users,
        { nullable: true }
    )
    foodType: Promise<FoodType>;
    
    @OneToMany(() => Offer, offer => offer.restaurant)
    incomingOffer: Offer;

    @OneToMany(() => Offer, offer => offer.seller)
    offeredOffer: Offer;

    @OneToMany(() => Review, review => review.from)
    reviewsFrom: Review[];

    @OneToMany(() => Review, review => review.to)
    reviewsTo: Review[];
}