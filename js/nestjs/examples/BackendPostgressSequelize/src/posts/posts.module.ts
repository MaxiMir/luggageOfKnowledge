import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../users/users.model'
import { Post } from './posts.model'
import { FilesModule } from '../files/files.module'

@Module({
	providers: [PostsService],
	controllers: [PostsController],
	imports: [
		SequelizeModule.forFeature([User, Post]),
		FilesModule,
	],
})
export class PostsModule {
}
