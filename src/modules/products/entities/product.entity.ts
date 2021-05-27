import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { IsDate, IsDateString } from 'class-validator';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index()
  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @ManyToOne((type) => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'selling_price', type: 'float' })
  sellingPrice: number;

  @Column({ name: 'stock_level' })
  stockLevel: number;

  @Column({ name: 'expiration_date', type: 'timestamp' })
  expirationDate: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date;
}
