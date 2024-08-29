import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export function
    IsMonthYear(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isMonthYear',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsMonthYearConstraint,
        });
    };
}

class IsMonthYearConstraint implements ValidatorConstraintInterface {
    validate(value: string) {
        const regex = /^(\d{2})-(\d{4})$/;
        return regex.test(value);
    }
}