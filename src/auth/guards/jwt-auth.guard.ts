import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from '../../config/public.key';
import { STRATEGY_JWT_AUTH } from '../constants/strategies.contants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(STRATEGY_JWT_AUTH) {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        return isPublic ? true : super.canActivate(context);
    }
}