import { plainToInstance, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { IsNotBlank } from './is-not-blank.validation';
import { AppEnvironment } from '../constants/app-environment';

class EnvironmentValidator {
  @IsEnum(AppEnvironment)
  ENVIRONMENT: AppEnvironment;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  PORT: number;

  @IsString()
  @IsNotBlank()
  POSTGRES_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  POSTGRES_PORT: number;

  @IsString()
  @IsNotBlank()
  POSTGRES_USERNAME: string;

  @IsString()
  @IsNotBlank()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotBlank()
  POSTGRES_DATABASE: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
