import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}