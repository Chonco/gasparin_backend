import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants, JwtPayload } from '../constants/jwt-constants';
import { RequestUser } from '../constants/request-user';
import { UserService } from '../../user/services/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: JwtPayload): Promise<RequestUser> {
        const user = await this.userService.getById(payload.sub);

        return {
            id: payload.sub,
            email: payload.username,
            userType: user.userType
        }
    }
}