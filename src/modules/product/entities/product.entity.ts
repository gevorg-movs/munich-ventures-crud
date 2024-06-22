import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseTable } from '../../../common/constants/database';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: DatabaseTable.PRODUCTS })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  sku: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;
}
