import { Test, TestingModule } from '@nestjs/testing';
import { CarpentersService } from './carpenters.service';

describe('CarpentersService', () => {
  let service: CarpentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarpentersService],
    }).compile();

    service = module.get<CarpentersService>(CarpentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
