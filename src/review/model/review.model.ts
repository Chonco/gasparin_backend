import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/models/user.model';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column("double")
    score: number;

    @ManyToOne(() => User, user => user.reviewsFrom)
    from: User;

    @ManyToOne(() => User, user => user.reviewsTo)
    to: User;
} 