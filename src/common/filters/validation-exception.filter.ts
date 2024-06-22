import { ValidationException } from '../exceptions/validation.exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ValidationError,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const validationErrors = exception.getResponse() as ValidationError[];

    const errors = this.transformValidationErrors(validationErrors);

    response.status(status).json({
      statusCode: status,
      errors,
    });
  }

  transformValidationErrors(validationErrors: ValidationError[]) {
    const errors = {};

    validationErrors.forEach((validationError) => {
      const { property, constraints, children } = validationError;

      if (children.length) {
        errors[property] = this.transformValidationErrors(children);
      } else {
        errors[property] = Object.values(constraints);
      }
    });

    return errors;
  }
}
