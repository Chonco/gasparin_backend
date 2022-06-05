import { Test, TestingModule } from '@nestjs/testing';
import { OfferCategoriesService } from './offer-categories.service';

describe('OfferCategoriesService', () => {
  let service: OfferCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferCategoriesService],
    }).compile();

    service = module.get<OfferCategoriesService>(OfferCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
