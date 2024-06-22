import { INestApplication } from '@nestjs/common';
import { EntityNotFoundErrorFilter } from '../filters/entity-not-found-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationExceptionFilter } from '../filters/validation-exception.filter';
import { AllExceptionsFilter } from '../filters/all-exception.filter';

export const setupExceptionFilters = (application: INestApplication) => {
  application.useGlobalFilters(
    new AllExceptionsFilter(application.get(HttpAdapterHost)),
    new ValidationExceptionFilter(),
    new EntityNotFoundErrorFilter(),
  );
};
