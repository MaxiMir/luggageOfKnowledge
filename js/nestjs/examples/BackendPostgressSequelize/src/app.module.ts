import * as path from 'path'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UsersModule } from './users/users.module'
import { User } from './users/users.model'
import { UserRoles } from './roles/user-roles.model'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/roles.model'
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { Post } from './posts/posts.model'
import { FilesModule } from './files/files.module'

@Module({
	controllers: [],
	providers: [], // @Injectable() .service | .guard
	imports: [ // импортируем другие модули в модуль AppModule
		ConfigModule.forRoot({ // модуль для считывания конфигов
			envFilePath: `.${process.env.NODE_ENV}.env`, // путь до файла с системными переменными. NODE_ENV указываем в package.json
		}),
		ServeStaticModule.forRoot({ // чтобы сервер отдавал статические файлы из static (требует установки дополнительного пакета)
			rootPath: path.resolve(__dirname, 'static'),
		}),
		SequelizeModule.forRoot({ // Подключение к БД
			dialect: 'postgres', // указываем тип БД
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRESS_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRESS_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, Role, UserRoles, Post],
			autoLoadModels: true, // создание таблиц на основании моделей, что мы будем создавать
		}),
		UsersModule,
		RolesModule,
		AuthModule,
		PostsModule,
		FilesModule,
	],
})
export class AppModule {
}
