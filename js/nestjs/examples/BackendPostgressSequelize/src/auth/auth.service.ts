import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { User } from '../users/users.model'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {

	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {}

	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto)

		return this.generateToken(user)
	}

	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email)

		if (candidate) {
			throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST) // 400 статус
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5) // хэшируем пароль, соль - 5
		const user = await this.userService.createUser({ ...userDto, password: hashPassword })

		return this.generateToken(user)
	}

	private async generateToken(user: User) {
		const payload = { email: user.email, id: user.id, roles: user.roles } // что храним в токене

		return {
			token: this.jwtService.sign(payload), // сгенерированный токен
		}
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)
		const passwordEquals = await bcrypt.compare(userDto.password, user.password) // сравнение пароля

		if (user && passwordEquals) {
			return user
		}

		throw new UnauthorizedException({ message: 'Некорректный email или пароль' })
	}
}
