import { hash } from "bcrypt";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserTypeEnum } from "../constants/user-type.enum";
import { User } from "../models/user.model";

export class UserInputDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    logoImg: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEnum(UserTypeEnum)
    userType: UserTypeEnum;

    static async toEntity(userDTO: UserInputDTO): Promise<User> {
        const user = new User();
        user.name = userDTO.name;
        user.address = userDTO.address;
        user.logoImg = userDTO.logoImg;
        user.email = userDTO.email;
        user.password = await hash(
            userDTO.password,
            parseInt(process.env.ROUNDS_TO_HASH)
        );
        user.phone = userDTO.phone;
        user.userType = userDTO.userType;

        return user;
    }
}