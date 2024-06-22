import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateCategoriesTable1682078434796 } from './1682078434796-create-categories-table';
import { CreateProductsTable1682078434797 } from './1682078434797-create-products-table';

dotenv.config({
  path: '.env',
});

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: true,
  entities: [__dirname + '../../../**/*.entity.{js,ts}'],
  migrations: [
    CreateCategoriesTable1682078434796,
    CreateProductsTable1682078434797,
  ],
});
