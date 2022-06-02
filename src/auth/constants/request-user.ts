import { UserTypeEnum } from '../../user/constants/user-type.enum';

export interface RequestUser {
    id: number,
    email: string,
    userType: UserTypeEnum
}