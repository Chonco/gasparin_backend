import { UserTypeEnum } from '../../user/constants/user-type.enum';

export class AuthTokenOutput {
    accessToken: string;
    refreshToken: string;
    userType: UserTypeEnum
}