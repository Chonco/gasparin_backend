import { Column, Double, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../user/models/user.model';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column()
    score: Double;

    @OneToMany(() => User, user => user.reviewsFrom)
    from: User;

    @OneToMany(() => User, user => user.reviewsTo)
    to: User;
} 