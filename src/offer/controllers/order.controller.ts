import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ReqContext } from 'src/shared/request-context/request-context.decorator';
import { OrderService } from '../services/order.service';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { OrderInput } from '../dto/order-input.dto';
import { Order } from '../model/order.model';

@Controller('order')
export class OrderController {
    constructor(private service: OrderService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(
        @ReqContext() context: RequestContext,
        @Body() input: OrderInput
    ): Promise<Order> {
        return await this.service.save(context.user, input);
    }
}
