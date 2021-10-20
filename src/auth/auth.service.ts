import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authDto: AuthDto): Promise<void>{
        return this.usersRepository.createUser(authDto);
    }

    async signIn(authDto: AuthDto):Promise<{accessToken:string}>{
        const { username, password} = authDto;
        const user = await this.usersRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            const payload:JwtPayload = {username};
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
