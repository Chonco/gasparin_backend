import { AuthGuard } from "@nestjs/passport";
import { STRATEGY_LOCAL } from "../constants/strategies.contants";

export class LocalAuthGuard extends AuthGuard(STRATEGY_LOCAL) {}