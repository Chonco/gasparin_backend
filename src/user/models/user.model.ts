import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserTypeEnum } from "../constants/user-type.enum";

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

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({ type: 'enum', enum: UserTypeEnum })
    userType: UserTypeEnum;
}