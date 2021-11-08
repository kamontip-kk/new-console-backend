import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { validate } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super(); //config
    }

    async validate(username: string, password: string): Promise<any> {
        await this._checkAuthBody(username, password);
    
        const res = await this.authService.signIn({
          username,
          password,
        });
    
        return res;
    }
    
    private async _checkAuthBody(username: string, password: string): Promise<AuthDto> {
        const body = new AuthDto();
        body.username = username;
        body.password = password;
    
        await validate(body).then((e) => {
          if (!e[0]) return;
    
          const objConstraints = Object.keys(e[0].constraints);
          const errorMessage = objConstraints
            ? e[0].constraints[objConstraints[objConstraints.length - 1]]
            : 'Form data is invalid.';
    
          throw new BadRequestException(errorMessage, `auth.${e[0].property}.invalid`);
        });
    
        return Promise.resolve(body);
    }


    // async validate(username: string, password: string): Promise<any>{
    //     const user = await this.authService.validateUser(username, password);

    //     if(!user){
    //         throw new UnauthorizedException();
    //     }

    //     return user;
    // }
}