import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/product.repository';

import {
  ICreateProductPayload,
  IProductService,
  IUpdateProductPayload,
} from './product-service.interface';
import { ProductEntity } from '../../entities/product.entity';
import { CategoryService } from '../../../category/services/category.service';
import { IPagination } from '../../../../common/types/pagination';
import { addPaginationToQuery } from '../../../../common/utils/pagination/add-pagination-to-query.util';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async create(payload: ICreateProductPayload): Promise<ProductEntity> {
    const { title, description, categoryId, sku, price } = payload;

    await this.categoryService.findByIdOrFail(categoryId);

    await this.validateUniqueSku(sku);

    return this.productRepository.save({
      title,
      description,
      categoryId,
      sku,
      price,
    });
  }

  findOne(id: number): Promise<ProductEntity> {
    const productQuery = this.productRepository.createQuery().where({ id });

    this.productRepository.includeCategory(productQuery);

    return productQuery.getOneOrFail();
  }

  findAll(params: IPagination): Promise<ProductEntity[]> {
    const { page, limit } = params;

    const productQuery = this.productRepository.createQuery();

    this.productRepository.includeCategory(productQuery);

    addPaginationToQuery(productQuery, { page, limit });

    return productQuery.getMany();
  }

  async update(id: number, payload: IUpdateProductPayload) {
    const product = await this.findOne(id);

    const { title, description, categoryId, sku, price } = payload;

    if (categoryId) {
      await this.categoryService.findByIdOrFail(categoryId);
    }

    if (sku && sku !== product.sku) {
      await this.validateUniqueSku(sku);
    }

    await this.productRepository.update(
      { id },
      {
        title,
        description,
        categoryId,
        sku,
        price,
      },
    );
  }

  async delete(id: number) {
    await this.findOne(id);

    await this.productRepository.delete({ id });
  }

  async validateUniqueSku(sku: string) {
    const product = await this.productRepository.findOneBy({ sku });

    if (product) {
      throw new BadRequestException({
        error: 'SKU already exists',
      });
    }
  }
}
