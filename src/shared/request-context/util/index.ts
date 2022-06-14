import { Request } from "express";
import { RequestContext } from '../request-context.dto';
import { UserAccessTokenClaims } from '../../../auth/dtos/user-token-claims.dto';
import { plainToClass } from "class-transformer";

export function createRequestContext(request: Request): RequestContext {
    const context = new RequestContext();
    
    context.user = request.user
        ? plainToClass(
            UserAccessTokenClaims,
            request.user,
            { excludeExtraneousValues: true }
        ) : null;

    return context;
}