import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '****',
      password: '****',
      database: '*****',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule
  ]
})
export class AppModule { }
