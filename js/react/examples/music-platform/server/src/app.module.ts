import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TrackModule } from './track/track.module'
import { FileModule } from './file/file.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }), // чтобы сервер отдавал статические файлы из static, требует установки дополнительного пакета
		MongooseModule.forRoot(
			'mongodb+srv://admin:admin@cluster0.oeudk.mongodb.net/music-platform?retryWrites=true&w=majority',
		),
		TrackModule,
		FileModule,
	],
})
export class AppModule {}
