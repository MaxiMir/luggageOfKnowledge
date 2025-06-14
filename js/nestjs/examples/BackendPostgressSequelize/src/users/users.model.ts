import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'
import { Post } from '../posts/posts.model'

interface UserCreationAttrs { // Поля нужные для создания объекта
	email: string;
	password: string;
}

@Table({ tableName: 'users' }) // Дженерик - таблица в БД
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' }) // Декоратор Пример и описание
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }) // Декоратор - колонка в таблице
	id: number

	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false }) // allowNull - не може быть null
	email: string

	@ApiProperty({ example: '12345678', description: 'Пароль' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string

	@ApiProperty({ example: 'true', description: 'Забанен или нет' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean

	@ApiProperty({ example: 'За хулиганство', description: 'Причина блокировки' })
	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

	@HasMany(() => Post)
	posts: Post[]
}

// Добавляется в app.module.ts в models и в user.module.ts + role.module.ts -> imports -> SequelizeModule.forFeature
