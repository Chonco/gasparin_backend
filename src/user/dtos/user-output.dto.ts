import { UserTypeEnum } from "../constants/user-type.enum";
import { User } from "../models/user.model";

export class UserOutputDTO {
    id: number;
    name: string;
    address: string;
    logoImg: string;
    email: string;
    phone: string;
    userType: UserTypeEnum;
    foodType?: string;

    static async fromUser(user: User): Promise<UserOutputDTO> {
        const dto = new UserOutputDTO();

        dto.id = user.id;
        dto.name = user.name;
        dto.address = user.address;
        dto.logoImg = user.logoImg;
        dto.email = user.email;
        dto.phone = user.phone;
        dto.userType = user.userType;

        if (dto.userType == UserTypeEnum.RESTAURANT) {
            const foodType = await user.foodType;
            dto.foodType = foodType.name;
        }

        return dto;
    }
}