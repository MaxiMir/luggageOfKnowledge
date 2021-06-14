import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest()

		try {
			const authHeader = req.headers.authorization
			const [bearer, token] = authHeader.split(' ')

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
			}

			req.user = this.jwtService.verify(token) // раскодируем токен

			return true // имеет доступ к endpoint
		} catch (e) {
			throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
		}
	}
}
