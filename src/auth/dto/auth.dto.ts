import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDto{
    
    // @MinLength(4)
    // @MaxLength(20)
    @IsString()
    username: string;

    
    // @MinLength(8)
    // @MaxLength(32)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //at least 1 upper case letter ,at least 1 lower case letter, at least 1 number or special character
    // { message: 'password is too weak'}) 
    @IsString()
    password: string;
}