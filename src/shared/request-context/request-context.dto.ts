import { UserAccessTokenClaims } from '../../auth/dtos/user-token-claims.dto';
export class RequestContext {
    user: UserAccessTokenClaims;
}