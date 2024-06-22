import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { PAGINATION_LIMIT, PAGINATION_PAGE } from '../constants/orm';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number = PAGINATION_LIMIT;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page: number = PAGINATION_PAGE;
}
