import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment } from '../../common/constants/environment';
import { ProductEntity } from '../../modules/product/entities/product.entity';
import { CategoryEntity } from '../../modules/category/entities/category.entity';

export const TypeOrmModule = NestTypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get(Environment.POSTGRES_HOST),
      port: Number(configService.get(Environment.POSTGRES_PORT)),
      username: configService.get(Environment.POSTGRES_USERNAME),
      password: configService.get(Environment.POSTGRES_PASSWORD),
      database: configService.get(Environment.POSTGRES_DATABASE),
      entities: [ProductEntity, CategoryEntity],
      useUTC: true,
    };
  },
  inject: [ConfigService],
});
