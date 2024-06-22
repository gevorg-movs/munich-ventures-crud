import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: MatchValidation,
    });
  };
}

@ValidatorConstraint({ name: 'IsNotBlank' })
class MatchValidation implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'string' && value?.trim().length > 0;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} should not be blank`;
  }
}
