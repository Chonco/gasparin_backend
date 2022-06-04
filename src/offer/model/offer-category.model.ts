import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
@Index('offer-category-indexes', ['id', 'name'])
export class OfferCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}