import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentsControllerV1 } from './apartments.controller.v1';
import { ApartmentsService } from '../services/apartments.service';
import { ApartmentRepository } from '../repository/apartments.repository';

describe('ApartmentsControllerV1', () => {
  let controller: ApartmentsControllerV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentsControllerV1],
      providers: [
        ApartmentsService,
        {
          provide: ApartmentRepository,
          useValue: {
            findMany: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApartmentsControllerV1>(ApartmentsControllerV1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
