import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, compareSync } from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import { JwtPayload } from '../constants/jwt-constants';
import { RequestUser } from '../constants/request-user';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<RequestUser> {
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

    async login(user: RequestUser) {
        const payload: JwtPayload = {
            username: user.email, sub: user.id
        }

        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
