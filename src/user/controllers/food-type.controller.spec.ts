import { Test, TestingModule } from '@nestjs/testing';
import { FoodTypeController } from './food-type.controller';

describe('FoodTypeController', () => {
  let controller: FoodTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodTypeController],
    }).compile();

    controller = module.get<FoodTypeController>(FoodTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
