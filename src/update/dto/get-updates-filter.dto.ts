import { IsEnum, IsOptional, IsString } from "class-validator";
import { UpdateStatus } from "../update-status.enum";

export class GetUpdatesFilterDto{
    @IsOptional()
    @IsEnum(UpdateStatus)
    status?: UpdateStatus;

    @IsOptional()
    @IsString()
    search?: string;
}