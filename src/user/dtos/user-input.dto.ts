import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    Length,
    MinLength,
    ValidateIf
} from "class-validator";
import { UserTypeEnum } from "../constants/user-type.enum";
import { User } from "../models/user.model";

export class UserInputDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    logoImg: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @Length(10, 10)
    phone: string;

    @IsEnum(UserTypeEnum)
    userType: UserTypeEnum;

    @ValidateIf(
        (input: UserInputDTO) => input.userType == UserTypeEnum.RESTAURANT
    )
    @IsNotEmpty()
    foodType: string;

    static async toEntity(userDTO: UserInputDTO): Promise<User> {
        const user = new User();
        user.name = userDTO.name;
        user.address = userDTO.address;
        user.logoImg = userDTO.logoImg;
        user.email = userDTO.email;
        user.password = userDTO.password;
        user.phone = userDTO.phone;
        user.userType = userDTO.userType;

        return user;
    }
}