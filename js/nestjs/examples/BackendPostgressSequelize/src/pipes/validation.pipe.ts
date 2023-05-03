import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exceptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		const obj = plainToClass(metadata.metatype, value) // объект для валидации преобразуем в класс
		const errors = await validate(obj) // ошибки валидации

		if (errors.length) {
			const messages = errors.map(err => `${err.property} - ${Object.values(err.constraints).join(', ')}`)

			throw new ValidationException(messages) // кастомная ошибка
		}

		return value
	}
}

// pipe - отвечают за преобразование или валидацию входных данных
