import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class Product {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@OneToMany(() => Photo, (photo) => photo.product)
@JoinColumn()
photos: Photo[]//подразумевается что может быть несколько фото продукта

@Column()
cost: number

@Column()
stock: number
}