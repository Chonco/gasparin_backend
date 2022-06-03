import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserOutputDTO } from '../dtos/user-output.dto';
import { User } from '../models/user.model';
import { UserInputDTO } from '../dtos/user-input.dto';
import { UserUpdateDTO } from '../dtos/user-update.dto';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private dataSource: DataSource,
        private configService: ConfigService
    ) { }

    async getAll(): Promise<UserOutputDTO[]> {
        return (await this.dataSource.getRepository(User).find())
            .map<UserOutputDTO>(
                user => UserOutputDTO.fromUser(user)
            );
    }

    async getById(id: number): Promise<UserOutputDTO> {
        return UserOutputDTO.fromUser(
            await this.dataSource.getRepository(User)
                .findOneBy({ id })
        );
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

        const user = await UserInputDTO.toEntity(input);
        return UserOutputDTO.fromUser(
            await this.dataSource.getRepository(User)
                .save(user)
        );
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
}
