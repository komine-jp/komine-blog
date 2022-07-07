import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Komine@19960116',
      database: 'komine_blog_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule
  ]
})
export class AppModule { }
