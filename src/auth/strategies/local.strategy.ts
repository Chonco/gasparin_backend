import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import { RequestUser } from '../constants/request-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' })
    }

    async validate(
        username: string,
        password: string
    ): Promise<RequestUser> {
        const user = await this.authService
            .validateUser(username, password);

        if (!user)
            throw new UnauthorizedException();

        return user;
    }

}