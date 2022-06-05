import {
    Controller,
    HttpCode,
    Post,
    HttpStatus,
    Body,
    Delete,
    Param,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { OfferService } from '../services/offer.service';
import { ReqContext } from '../../shared/request-context/request-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { OfferInput } from '../dto/offer-input.dto';
import { OfferOutput } from '../dto/offer-output.dto';
import { OfferSearchInput } from '../dto/offer-search-input.dto';

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

    @Post('get-filtered')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getFiltered(
        @ReqContext() context: RequestContext,
        @Body() searchCriteria: OfferSearchInput
    ): Promise<OfferOutput[]> {
        return await this.service.getFiltered(context.user, searchCriteria);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async deleteById(@Param('id') id: number) {
        await this.service.deleteById(id);
    }

}
