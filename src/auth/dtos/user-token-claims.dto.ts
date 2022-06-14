import { Expose } from 'class-transformer';
import { UserTypeEnum } from '../../user/constants/user-type.enum';

export class UserAccessTokenClaims {
    @Expose()
    id: number;
    @Expose()
    email: string;
    @Expose()
    userType: UserTypeEnum;
}

export class UserRefrechTokenClaims {
    id: number;
}