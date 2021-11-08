import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    handleRequest(err: any, user:any){
        if(err) throw err;
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}