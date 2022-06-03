import { IsNotEmpty } from "class-validator";

export class LoginCredentials {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: String;
}