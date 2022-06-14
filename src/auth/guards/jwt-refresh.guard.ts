import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { STRATEGY_JWT_REFRESH } from '../constants/strategies.contants';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(STRATEGY_JWT_REFRESH) {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException(`${info}`)
        }

        return user;
    }
}