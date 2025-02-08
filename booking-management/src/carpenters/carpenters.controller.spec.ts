import { Test, TestingModule } from '@nestjs/testing';
import { CarpentersController } from './carpenters.controller';

describe('CarpentersController', () => {
  let controller: CarpentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarpentersController],
    }).compile();

    controller = module.get<CarpentersController>(CarpentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
