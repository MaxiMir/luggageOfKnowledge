import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from './pipes/validation.pipe'


async function start() {
	const PORT = process.env.PORT || 5000
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Make Nest great again') // название приложения
		.setDescription('Rest Api') // Описание приложения
		.setVersion('1.0.0') // Версия проекта
		.addTag('Nest')
		.build() // конфиг для swagger
	const document = SwaggerModule.createDocument(app, config) // документ для swagger
	SwaggerModule.setup('/api/docs', app, document) // 1 - urn для просмотра

	app.useGlobalPipes(new ValidationPipe())

	await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()
