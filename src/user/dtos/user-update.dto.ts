import { hash } from "bcrypt";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { User } from '../models/user.model';

export class UserUpdateDTO {
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    logoImg: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @MinLength(8)
    password: string;

    static async toEntity(input: UserUpdateDTO): Promise<User> {
        const user = new User();

        user.address = input.address;
        user.logoImg = input.logoImg;
        user.email = input.email;
        user.phone = input.phone;
        user.password = await hash(
            input.password,
            parseInt(process.env.ROUNDS_TO_HASH)
        );

        return user;
    }
}