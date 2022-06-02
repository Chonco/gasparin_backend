import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserTypeEnum } from "../constants/user-type.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    address: String;

    @Column()
    logiImg: String;

    @Column()
    email: String;

    @Column()
    password: String;

    @Column()
    phone: String;

    @Column({ type: 'enum', enum: UserTypeEnum })
    userType: UserTypeEnum
}