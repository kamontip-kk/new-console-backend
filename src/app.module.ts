import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateModule } from './update/update.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AppConfigModule,
    UpdateModule,
    // MulterModule.register({
    //   dest: './uploads'
    // }),
    AuthModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'new-console',
    //   autoLoadEntities: true,
    //   synchronize: true, // !!shouldn't be used in production - otherwise you can lose production data but this always keep database's scema in sync
    // }),
    
  ],
})
export class AppModule {}
