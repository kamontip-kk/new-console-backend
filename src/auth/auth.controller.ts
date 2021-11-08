import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('/signup')
    signUp(@Body() authDto: AuthDto): Promise<void>{
        return this.authService.signUp(authDto);
    }

    
    // @Post('/signin')
    // signIn(@Body() authDto: AuthDto): Promise<{accessToken:string}>{
    //     return this.authService.signIn(authDto);
    // }

    @UseGuards(AuthGuard('local'))
    @Post('/signin')
    signIn(@Req() req: Request){
        return req['user'];
    }
}
