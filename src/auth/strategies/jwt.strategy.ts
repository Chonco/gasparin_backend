import { STRATEGY_JWT_AUTH } from './../constants/strategies.contants';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../constants/jwt.constants';
import { UserService } from '../../user/services/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserAccessTokenClaims } from '../dtos/user-token-claims.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY_JWT_AUTH) {
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('jwt.secret'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtPayload): Promise<UserAccessTokenClaims> {
        const user = await this.userService.getById(payload.sub);

        return {
            id: payload.sub,
            email: payload.username,
            userType: user.userType
        }
    }
}