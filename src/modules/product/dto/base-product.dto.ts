import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { IsNotBlank } from '../../../common/validations/is-not-blank.validation';
import { PRODUCT_SKU_REGEX } from '../constants/product.constants';

export class BaseProductDto {
  @IsNotBlank()
  @IsString()
  title: string;

  @IsNotBlank()
  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNotBlank()
  @IsString()
  @Matches(PRODUCT_SKU_REGEX, {
    message: 'SKU should be alpha-numeric and 8 characters long',
  })
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
