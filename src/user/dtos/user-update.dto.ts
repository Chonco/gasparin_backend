import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { User } from '../models/user.model';

export class UserUpdateDTO {
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    logoImg: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: string;

    @MinLength(8)
    password: string;

    static async toEntity(input: UserUpdateDTO): Promise<User> {
        const user = new User();

        user.address = input.address;
        user.logoImg = input.logoImg;
        user.email = input.email;
        user.phone = input.phone;
        user.password = input.password;

        return user;
    }
}