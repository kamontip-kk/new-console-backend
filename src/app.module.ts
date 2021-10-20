import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateModule } from './update/update.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UpdateModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'new-console',
      autoLoadEntities: true,
      synchronize: true, // !!shouldn't be used in production - otherwise you can lose production data but this always keep database's scema in sync
    }),
    AuthModule
  ],
})
export class AppModule {}
