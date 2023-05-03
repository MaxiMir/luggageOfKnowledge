import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto { // DTO для создания пользователя

	@ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
	@IsString({ message: 'Должно быть строкой' }) // декоратор для валидации
	@IsEmail({}, { message: 'Некорректный email' }) // декоратор для валидации
	readonly email: string

	@ApiProperty({ example: '12345', description: 'пароль' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(4, 16, { message: 'Не меньше 4 и не больше 16' }) // декоратор для валидации
	readonly password: string
}
