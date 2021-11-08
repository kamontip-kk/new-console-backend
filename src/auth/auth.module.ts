import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersRepository } from './users.repository';

@Module({
  imports:[
    // PassportModule.register({session: true}),
    JwtModule.registerAsync({
      // secret: 'topSecret51', // put env var
      // signOptions: {
      //   expiresIn: 3600, // '60s'
      useFactory: (configService: ConfigService) => configService.get('jwt'),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy, 
    LocalStrategy, 
  ],
  exports: [
    JwtStrategy, 
    PassportModule,
    AuthService,
  ],
})
export class AuthModule {}
