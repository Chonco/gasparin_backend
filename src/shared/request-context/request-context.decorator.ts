import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestContext } from "./request-context.dto";
import { createRequestContext } from "./util";

export const ReqContext = createParamDecorator(
    (data: unknown, context: ExecutionContext): RequestContext => {
        const request = context.switchToHttp().getRequest();
        return createRequestContext(request);
    }
)