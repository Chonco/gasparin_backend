import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { STRATEGY_JWT_REFRESH } from '../constants/strategies.contants';
import { ConfigService } from '@nestjs/config';
import { UserRefrechTokenClaims } from '../dtos/user-token-claims.dto';
import { JwtPayload } from '../constants/jwt.constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    STRATEGY_JWT_REFRESH
) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            secretOrKey: configService.get('jwt.secret'),
            algorithms: ['RS256'],
        });
    }

    async validate(payload: JwtPayload): Promise<UserRefrechTokenClaims> {
        return {
            id: payload.sub
        }
    }
}