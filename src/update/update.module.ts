import { Module } from '@nestjs/common';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateRepository } from './update.repository';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([UpdateRepository]),
    AuthModule,
    // MulterModule.register({
    //   dest: './uploads',
    // }),
  ],
  providers: [UpdateService],
  controllers: [UpdateController]
})
export class UpdateModule {}
