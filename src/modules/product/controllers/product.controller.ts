import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductRequestDto } from '../dto/create-product/create-product-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product/product.service';
import { UpdateProductRequestDto } from '../dto/update-product/update-product-request.dto';
import { ParseEmptyObjectPipe } from '../../../common/pipes/parse-empty-object.pipe';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() createProductRequestDto: CreateProductRequestDto) {
    const createdProduct = await this.productService.create(
      createProductRequestDto,
    );

    return this.productService.findOne(createdProduct.id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ParseEmptyObjectPipe)
    updateProductRequestDto: UpdateProductRequestDto,
  ) {
    await this.productService.update(id, updateProductRequestDto);

    return this.productService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
