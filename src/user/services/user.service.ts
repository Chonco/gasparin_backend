import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOutputDTO } from '../dtos/user-output.dto';
import { User } from '../models/user.model';
import { UserInputDTO } from '../dtos/user-input.dto';
import { UserUpdateDTO } from '../dtos/user-update.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async getAll(): Promise<UserOutputDTO[]> {
        return (await this.userRepository.find())
            .map<UserOutputDTO>(
                user => UserOutputDTO.fromUser(user)
            );
    }

    async getById(id: number): Promise<UserOutputDTO> {
        return UserOutputDTO.fromUser(
            await this.userRepository.findOneBy({ id })
        );
    }

    async getByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({ email });
    }

    async save(input: UserInputDTO): Promise<UserOutputDTO> {
        const user = await UserInputDTO.toEntity(input);
        return UserOutputDTO.fromUser(
            await this.userRepository.save(user)
        );
    }

    async update(id: number, input: UserUpdateDTO): Promise<UserOutputDTO> {
        const user = {
            ...(await this.userRepository.findOneBy({ id })),
            ...(await UserUpdateDTO.toEntity(input)),
        }

        return UserOutputDTO.fromUser(
            await this.userRepository.save(user)
        );
    }

    async remove(id: number) {
        await this.userRepository.delete(id);
    }
}
