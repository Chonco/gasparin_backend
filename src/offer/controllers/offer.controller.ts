import { Controller, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';
import { OfferService } from '../services/offer.service';
import { ReqContext } from '../../shared/request-context/request-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { OfferInput } from '../dto/offer-input.dto';
import { OfferOutput } from '../dto/offer-output.dto';

@Controller('offer')
export class OfferController {
    constructor(private service: OfferService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @ReqContext() context: RequestContext,
        @Body() input: OfferInput
    ): Promise<OfferOutput> {
        return await this.service.save(context.user.id, input);
    }
}
