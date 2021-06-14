import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from '../users/users.model'
import { Role } from './roles.model'

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false }) // убираем лишние поля из таблицы
export class UserRoles extends Model<UserRoles> {

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number

	@ForeignKey(() => Role) // Декоратор внешний ключ (на какую модель ссылается)
	@Column({ type: DataType.INTEGER })
	roleId: number

	@ForeignKey(() => User) // Декоратор внешний ключ (на какую модель ссылается)
	@Column({ type: DataType.INTEGER })
	userId: number

}
