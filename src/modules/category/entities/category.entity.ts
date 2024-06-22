import { DatabaseTable } from '../../../common/constants/database';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: DatabaseTable.CATEGORIES })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;
}
