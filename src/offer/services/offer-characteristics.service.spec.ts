import { Test, TestingModule } from '@nestjs/testing';
import { OfferCharacteristicsService } from './offer-characteristics.service';

describe('OfferCharacteristicsService', () => {
  let service: OfferCharacteristicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferCharacteristicsService],
    }).compile();

    service = module.get<OfferCharacteristicsService>(OfferCharacteristicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
