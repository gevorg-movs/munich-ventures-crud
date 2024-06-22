import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }
}
