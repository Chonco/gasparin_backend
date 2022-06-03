import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/config/public.key';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @Public()
    async login(@Request() req) {
        return this.service.login(req.user);
    }
}
