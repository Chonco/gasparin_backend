import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserOutputDTO } from '../dtos/user-output.dto';
import { UserService } from '../services/user.service';
import { UserInputDTO } from '../dtos/user-input.dto';
import { UserUpdateDTO } from '../dtos/user-update.dto';
import { Public } from '../../config/public.key';
import { RestaurantSearchDTO } from '../dtos/restaurant-search.dto';

@Controller('user')
export class UserController {
    constructor(private service: UserService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll(): Promise<UserOutputDTO[]> {
        return await this.service.getAll();
    }

    @Post('restaurant-search')
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({ transform: true }))
    async getWithSearch(
        @Body() searchParams: RestaurantSearchDTO
    ): Promise<UserOutputDTO[]> {
        return await this.service.searchUser(searchParams);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param() id: number): Promise<UserOutputDTO> {
        return await this.service.getById(id);
    }

    @Post()
    @Public()
    @HttpCode(HttpStatus.CREATED)
    async add(@Body() user: UserInputDTO): Promise<UserOutputDTO> {
        return await this.service.save(user);
    }

    @Put(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async update(
        @Param() id: number,
        @Body() user: UserUpdateDTO
    ): Promise<UserOutputDTO> {
        return await this.service.update(id, user);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async delete(@Param() id: number) {
        await this.delete(id);
    }
}
