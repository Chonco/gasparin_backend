import { BadRequestException, Injectable, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserOutputDTO } from '../dtos/user-output.dto';
import { User } from '../models/user.model';
import { UserInputDTO } from '../dtos/user-input.dto';
import { UserUpdateDTO } from '../dtos/user-update.dto';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { RestaurantSearchDTO } from '../dtos/restaurant-search.dto';
import { FoodTypeService } from './food-type.service';
import { UserTypeEnum } from '../constants/user-type.enum';

@Injectable()
export class UserService {
    constructor(
        private dataSource: DataSource,
        private configService: ConfigService,
        private foodTypeService: FoodTypeService
    ) { }

    async getAll(): Promise<UserOutputDTO[]> {
        const allUsers = await this.dataSource.getRepository(User).find();

        const outputUsers: UserOutputDTO[] = [];

        for (let index = 0; index < allUsers.length; index++) {
            const user = allUsers[index];

            outputUsers.push(await UserOutputDTO.fromUser(user))
        }

        return outputUsers;
    }

    async getById(id: number): Promise<UserOutputDTO> {
        const user = await this.dataSource.getRepository(User)
            .findOneBy({ id });

        if (!user) {
            throw new NotFoundException();
        }

        return UserOutputDTO.fromUser(user);
    }

    async getUnformattedUserById(id: number): Promise<User> {
        return await this.dataSource.getRepository(User)
            .findOneBy({ id });
    }

    async getByEmail(email: string): Promise<User> {
        return await this.dataSource.getRepository(User)
            .findOneBy({ email });
    }

    async save(input: UserInputDTO): Promise<UserOutputDTO> {
        input.password = await hash(
            input.password,
            parseInt(this.configService.get('encrypt.roundsToHash'))
        );

        const parsed = await UserInputDTO.toEntity(input);

        if (parsed.userType == UserTypeEnum.RESTAURANT) {
            parsed.foodType = Promise.resolve(
                await this.foodTypeService
                    .getOrCreate(input.foodType)
            );
        }

        try {
            return UserOutputDTO.fromUser(
                await this.dataSource.getRepository(User)
                    .save(parsed)
            );
        } catch (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                throw new BadRequestException(
                    {
                        statusCode: HttpStatus.CONFLICT,
                        message: 'Email already in use'
                    });
            }
            throw new HttpException(
                "Unkwnown Error",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(id: number, input: UserUpdateDTO): Promise<UserOutputDTO> {
        input.password = await hash(
            input.password,
            parseInt(this.configService.get('encrypt.roundsToHash'))
        );

        const user = {
            ...(await this.dataSource.getRepository(User).findOneBy({ id })),
            ...(await UserUpdateDTO.toEntity(input)),
        }

        return UserOutputDTO.fromUser(
            await this.dataSource.getRepository(User)
                .save(user)
        );
    }

    async remove(id: number) {
        await this.dataSource.getRepository(User).delete(id);
    }

    async searchUser(input: RestaurantSearchDTO): Promise<UserOutputDTO[]> {
        let queryBuilder = this.dataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.foodType', 'foodType')
            .where(
                'user.userType = :userType AND user.name LIKE :restaurantName',
                {
                    userType: UserTypeEnum.RESTAURANT,
                    restaurantName: `%${input.name}%`
                }
            );

        if (input.foodType.length) {
            queryBuilder = queryBuilder.andWhere(
                'foodType.name IN (:...foodTypeName)',
                { foodTypeName: input.foodType }
            );
        }

        const filteredUsers = await queryBuilder
            .skip(input.perPage * (input.currentPage))
            .take(input.perPage)
            .getMany();

        const parsedUsers: UserOutputDTO[] = [];

        for (let index = 0; index < filteredUsers.length; index++) {
            const user = filteredUsers[index];
            parsedUsers.push(await UserOutputDTO.fromUser(user));
        }

        return parsedUsers;
    }
}
