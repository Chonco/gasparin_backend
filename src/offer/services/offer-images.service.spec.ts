import { Test, TestingModule } from '@nestjs/testing';
import { OfferImagesService } from './offer-images.service';

describe('OfferImagesService', () => {
  let service: OfferImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferImagesService],
    }).compile();

    service = module.get<OfferImagesService>(OfferImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
