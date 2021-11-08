import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
// import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload, AuthResponse } from './auth.interface';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ){}

    async signUp(authDto: AuthDto): Promise<void>{
        return this.usersRepository.createUser(authDto);
    }

    // async signIn(authDto: AuthDto):Promise<{accessToken:string}>{
    //     const { username, password} = authDto;
    //     const user = await this.usersRepository.findOne({ username });

    //     if(user && (await bcrypt.compare(password, user.password))){
    //         const payload = {username};
    //         const accessToken = await this.jwtService.sign(payload);

    //         return {accessToken};
    //     } else {
    //         throw new UnauthorizedException('Please check your login credentials');
    //     }
    // }

    // async validateUser(authDto: AuthDto): Promise<any>{
    //     const { username, password} = authDto;
    //     const user = await this.usersRepository.findOne({username});

    //     if(user && (await bcrypt.compare(password, user.password))){
    //         const { username, password , ...rest} = user;
    //         return rest;
    //     }

    //     return null;
    // }

    async signIn(authDto: AuthDto):Promise<AuthResponse>{
        this.logger.verbose({
            message: {fn: this.signIn.name, data: {username: authDto.username}},
        })

        // const appUsername = this.configService.get('app.username');
        // const appPassword = this.configService.get('app.password');

        // if (!appUsername || !appPassword) throw new UnauthorizedException();

        // if (authDto.username !== appUsername || authDto.password != appPassword)
        // throw new UnauthorizedException();

        const { username, password} = authDto;
        const user = await this.usersRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            // const payload = {username};
            // const accessToken = await this.jwtService.sign(payload);
        
            // return {accessToken};
            const adminId = 1;
            const payload: AuthPayload = { id: adminId };
            const jwtSignOptions = { subject: adminId.toString() };
            const token = this.jwtService.sign(payload, jwtSignOptions);

        return Promise.resolve({ token } as AuthResponse);
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }

        // const adminId = 1;
        // const payload: AuthPayload = { id: adminId };
        // const jwtSignOptions = { subject: adminId.toString() };
        // const token = this.jwtService.sign(payload, jwtSignOptions);

        // return Promise.resolve({ token } as AuthResponse);
    }

}
