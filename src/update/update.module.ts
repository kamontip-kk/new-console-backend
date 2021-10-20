import { Module } from '@nestjs/common';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateRepository } from './update.repository';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([UpdateRepository]),
    AuthModule,
  ],
  providers: [UpdateService],
  controllers: [UpdateController]
})
export class UpdateModule {}
