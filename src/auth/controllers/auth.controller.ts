import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { Public } from 'src/config/public.key';
import { RequestContext } from 'src/shared/request-context/request-context.dto';
import { AuthTokenOutput } from '../dtos/auth-token-output.dto';
import { LoginCredentials } from '../dtos/login-credentials.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { ReqContext } from '../../shared/request-context/request-context.decorator';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RefreshTokenInput } from '../dtos/refresh-token-input.dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }

    @Post('login')
    @Public()
    @UseGuards(LocalAuthGuard)
    async login(
        @ReqContext() context: RequestContext,
        @Body() credentials: LoginCredentials
    ): Promise<AuthTokenOutput> {
        return await this.service.login(context);
    }

    @Post('refresh-token')
    @Public()
    @UseGuards(JwtRefreshGuard)
    async refreshToken(
        @ReqContext() context: RequestContext,
        @Body() credential: RefreshTokenInput 
    ): Promise<AuthTokenOutput> {
        return await this.service.refreshToken(context);
    }

}
