import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { ConfigModule } from '@nestjs/config';
import { FoodType } from './models/food-type.model';
import { FoodTypeService } from './services/food-type.service';
import { FoodTypeController } from './controllers/food-type.controller';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, FoodType])],
  providers: [UserService, FoodTypeService],
  controllers: [UserController, FoodTypeController],
  exports: [UserService]
})
export class UserModule { }
