import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { User } from '../users/users.model'
import { UserRoles } from './user-roles.model'

interface RoleCreationAttrs {
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {

	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number

	@ApiProperty({ example: 'ADMIN', description: 'Уникальное Значение роли ' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string

	@ApiProperty({ example: 'Администратор', description: 'Описание роли' })
	@Column({ type: DataType.STRING, allowNull: false })
	description: string

	@BelongsToMany(() => User, () => UserRoles) // связь многие ко многим. 1 - параметр сущность / 2-й через какую таблицу
	users: User[] // аналогично нужно сделать и в самом User
}

// Добавляется в app.module.ts в models и в role.module.ts -> imports -> SequelizeModule.forFeature
