import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({ // регистрируем Jwt модуль
			secret: process.env.PRIVATE_KEY || 'SECRET',
			signOptions: {
				expiresIn: '24h', // время жизни токена
			},
		}),
	],
	exports: [
		AuthService,
		JwtModule,
	],
})
export class AuthModule {
}
