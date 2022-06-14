import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import { JwtPayload } from '../constants/jwt.constants';
import { AuthTokenOutput } from '../dtos/auth-token-output.dto';
import { UserAccessTokenClaims } from '../dtos/user-token-claims.dto';
import { UserOutputDTO } from '../../user/dtos/user-output.dto';
import { ConfigService } from '@nestjs/config';
import { RequestContext } from '../../shared/request-context/request-context.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(
        email: string,
        password: string
    ): Promise<UserAccessTokenClaims> {
        const user = await this.userService.getByEmail(email);

        if (user && compareSync(password, user.password)) {
            return {
                id: user.id,
                email,
                userType: user.userType
            }
        }

        return null;
    }

    async login(context: RequestContext): Promise<AuthTokenOutput> {
        return this.getAuthToken(context.user);
    }

    async refreshToken(
        context: RequestContext
    ): Promise<AuthTokenOutput> {
        const user = await this.userService.getById(context.user.id);

        if (!user)
            throw new UnauthorizedException();

        return this.getAuthToken(user);
    }

    private getAuthToken(
        user: UserOutputDTO | UserAccessTokenClaims
    ): AuthTokenOutput {
        const subject = {
            sub: user.id
        }
        const payload: JwtPayload = {
            sub: user.id,
            username: user.email
        }

        return {
            refreshToken: this.jwtService.sign(subject, {
                expiresIn: `${this.configService.get('jwt.expireTimePublic')}s`
            }),
            accessToken: this.jwtService.sign(
                { ...payload, ...subject },
                { expiresIn: `${this.configService.get('jwt.expireTimeSecret')}s` }
            ),
            userType: user.userType
        }
    }
}
