import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import { STRATEGY_LOCAL } from "../constants/strategies.contants";
import { UserAccessTokenClaims } from "../dtos/user-token-claims.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY_LOCAL) {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(
        username: string,
        password: string
    ): Promise<UserAccessTokenClaims> {
        const user = await this.authService.validateUser(username, password);

        if (!user)
            throw new UnauthorizedException();

        return user;
    }

}