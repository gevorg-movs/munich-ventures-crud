import { IsOptional } from 'class-validator';
import { BaseProductDto } from '../base-product.dto';

export class UpdateProductRequestDto extends BaseProductDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  categoryId: number;

  @IsOptional()
  sku: string;

  @IsOptional()
  price: number;
}
