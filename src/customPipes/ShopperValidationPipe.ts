
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, ParseUUIDPipeOptions } from '@nestjs/common';
import { validate, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidateDataPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToClass(metadata.metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            const errorMessages = errors.map(err => {
                return err.constraints[Object.keys(err.constraints)[0]]
            });

            throw new BadRequestException({
                error_code: 'INVALID_DATA',
                error_description: errorMessages
            });
        }

        return value;
    }
}