import { IsNotEmpty } from "class-validator";

export class AddUpdateDto{
    @IsNotEmpty()
    img: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    subtitle: string;

    url: string;
}