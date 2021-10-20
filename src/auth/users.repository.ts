import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
    async createUser(authDto: AuthDto): Promise<void>{
        const { username, password } = authDto;

        //hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY'){
                throw new ConflictException('Username alreaady exists')
            } else {
                throw new InternalServerErrorException(error);
            }       
        }
    }
}