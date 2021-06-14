import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from './dto/create-user.dto'
import { RolesService } from '../roles/roles.service'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(User) private userRepository: typeof User, // Repository - потому что будем взаимодействовать с БД
		private roleService: RolesService, // чтобы использовать необходим import в user.module.ts и exports в roles.module.ts
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto)
		const role = await this.roleService.getRoleByValue('ADMIN')
		await user.$set('roles', [role.id]) // $set - добавляем в БД роль пользователя (инициализация)
		user.roles = [role]
		return user
	}

	async getAllUsers() {
		return await this.userRepository.findAll({ include: { all: true } }) // include какую модель подтягиваем, здесь все
	}

	async getUserByEmail(email: string) {
		return await this.userRepository.findOne({ where: { email }, include: { all: true } })
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId)
		const role = await this.roleService.getRoleByValue(dto.value)

		if (role && user) {
			await user.$add('role', role.id) // добавление роли в БД (добавление уже к проинициализированным)

			return dto
		}

		throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
	}

	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId)

		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
		}

		user.banned = true
		user.banReason = dto.banReason

		await user.save()

		return user
	}
}
