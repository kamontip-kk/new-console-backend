import { Injectable, UnauthorizedException , Logger} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
// import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";
import { ConfigService } from 'nestjs-config';
import { AuthPayload } from "./auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    private readonly logger =  new Logger(this.constructor.name);

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private readonly configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignorExpiration: false,
            secretOrKey: 'topSecret11', //configService.get('jwt.secret'), // protect this, move to env var
            passReqToCallback: true,
        });
    }

    // async validate(payload: any): Promise<User>{
    //     const {username} = payload;
    //     const user:User = await this.usersRepository.findOne({username});

    //     if(!user){
    //         throw new UnauthorizedException();
    //     }

    //     return user;
    // }

    async validate(req: any, payload: any): Promise<AuthPayload> {
        this.logger.verbose({
          message: {
            fn: this.validate.name,
            data: {
              token: req.headers['authorization'] || '',
              payload,
            },
          },
        });
    
        const rtn: AuthPayload = {
          id: +payload.sub || 0,
        };
    
        return Promise.resolve(rtn);
      }
}