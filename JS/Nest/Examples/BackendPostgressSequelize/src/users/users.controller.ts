import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { Roles } from '../auth/roles-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
import { User } from './users.model'

@ApiTags('Пользователи') // Декоратор название
@Controller('users')
export class UsersController {

	constructor(private usersService: UsersService) {} // Dependency Injection

	@ApiOperation({ summary: 'Создание пользователя' }) // описание для swagger
	@ApiResponse({ status: 200, type: User }) // статус ответа и что возвращает
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto)
	}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200, type: [User] }) // [User] - массив User
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers()
	}

	@ApiOperation({ summary: 'Выдать роль' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto)
	}

	@ApiOperation({ summary: 'Забанить пользователя' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto)
	}
}
