import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserTypeEnum } from "../constants/user-type.enum";
import { FoodType } from './food-type.model';

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
}