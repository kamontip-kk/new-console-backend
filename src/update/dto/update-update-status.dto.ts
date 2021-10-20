import { IsEnum, IsOptional, IsString } from "class-validator";
import { UpdateStatus } from "../update-status.enum";

export class UpdateUpdateStatusDto{
    @IsEnum(UpdateStatus)
    status: UpdateStatus;

    // @IsOptional()
    // @IsString()
    // title?: string;

    // @IsOptional()
    // @IsString()
    // subtitle?: string;

    // @IsOptional()
    // @IsString()
    // img?: string;

    // @IsOptional()
    // @IsString()
    // url?: string;
}