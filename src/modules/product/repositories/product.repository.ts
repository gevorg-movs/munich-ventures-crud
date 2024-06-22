import {
  DataSource,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  queryAlias = 'product';

  createQuery(
    alias = this.queryAlias,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<ProductEntity> {
    return this.createQueryBuilder(alias, queryRunner);
  }

  includeCategory(productQuery: SelectQueryBuilder<ProductEntity>) {
    productQuery.leftJoinAndSelect(`${this.queryAlias}.category`, 'category');
  }
}
