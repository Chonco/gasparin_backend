import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.model';

@Entity()
@Index('foodTypeIndexes', ['id', 'name'])
export class FoodType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => User, user => user.foodType)
    users: Promise<User[]>;
}