// src/apartments/apartments.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentsService } from './apartments.service';
import { ApartmentRepository } from '../repository/apartments.repository';
import { FindApartmentsDto } from '../dto/find-apartments.dto';
import { Apartment, FinishingState } from '@prisma/client';

describe('ApartmentsService', () => {
  let service: ApartmentsService;
  let repository: ApartmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApartmentsService,
        {
          provide: ApartmentRepository,
          useValue: {
            findMany: jest.fn(),
            findOne: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApartmentsService>(ApartmentsService);
    repository = module.get<ApartmentRepository>(ApartmentRepository);
  });

  it('should call repository.findMany with proper OR filter and pagination and return data with meta', async () => {
    // Arrange: Filter by unitName only; page 2 with limit 5
    const filters: FindApartmentsDto = {
      unitName: 'Penthouse',
      page: 2,
      limit: 5,
    };

    const expectedWhereClause = {
      OR: [{ unitName: { contains: 'Penthouse', mode: 'insensitive' } }],
    };

    const expectedSkip = 5; // (2 - 1) * 5
    const expectedTake = 5; // limit

    // Mock repository responses
    const apartmentsMock: Apartment[] = [
      {
        id: '1',
        unitName: 'Penthouse A',
        unitNumber: 'A101',
        description: 'Luxurious apt',
        price: 500000,
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        images: ['img1.jpg'],
        project: 'Project X',
        developer: 'DevCo',
        finishing: FinishingState.FULLY_FINISHED,
        deliveryDate: new Date('2025-01-01'),
        street: 'Main St',
        city: 'New York',
        country: 'USA',
        amenities: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const totalMock = 20;

    jest.spyOn(repository, 'findMany').mockResolvedValue(apartmentsMock);
    jest.spyOn(repository, 'count').mockResolvedValue(totalMock);

    // Act
    const result = await service.findManyPaginated(filters);

    // Assert repository calls
    expect(repository.findMany).toHaveBeenCalledWith(
      expectedWhereClause,
      expectedSkip,
      expectedTake,
    );
    expect(repository.count).toHaveBeenCalledWith(expectedWhereClause);

    // Assert returned data and meta
    expect(result).toEqual({
      data: apartmentsMock,
      meta: {
        total: totalMock,
        page: 2,
        limit: 5,
        totalPages: Math.ceil(totalMock / 5),
      },
    });
  });

  it('should return all apartments with default pagination if no filters provided', async () => {
    // Arrange: No filters provided
    const filters: FindApartmentsDto = {};
    const expectedWhereClause = {};
    const expectedSkip = 0;
    const expectedTake = 10; // default limit

    const apartmentsMock: Apartment[] = [];
    const totalMock = 0;

    jest.spyOn(repository, 'findMany').mockResolvedValue(apartmentsMock);
    jest.spyOn(repository, 'count').mockResolvedValue(totalMock);

    // Act
    const result = await service.findManyPaginated(filters);

    // Assert
    expect(repository.findMany).toHaveBeenCalledWith(
      expectedWhereClause,
      expectedSkip,
      expectedTake,
    );
    expect(repository.count).toHaveBeenCalledWith(expectedWhereClause);
    expect(result).toEqual({
      data: apartmentsMock,
      meta: {
        total: totalMock,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    });
  });

  describe('findOne', () => {
    it('should return an apartment by id', async () => {
      // Arrange
      const apartmentId = '123';
      const apartmentMock: Apartment = {
        id: apartmentId,
        unitName: 'Studio X',
        unitNumber: 'S100',
        description: 'Cozy studio',
        price: 300000,
        bedrooms: 1,
        bathrooms: 1,
        area: 50,
        images: ['studio.jpg'],
        project: 'Project Y',
        developer: 'DevInc',
        finishing: FinishingState.SEMI_FINISHED,
        deliveryDate: new Date('2025-06-01'),
        street: 'Second St',
        city: 'Los Angeles',
        country: 'USA',
        amenities: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (repository.findOne as jest.Mock).mockResolvedValue(apartmentMock);

      // Act
      const result = await service.findOne(apartmentId);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith(apartmentId);
      expect(result).toEqual(apartmentMock);
    });
  });

  describe('create', () => {
    it('should create and return a new apartment', async () => {
      // Arrange
      const createData = {
        unitName: 'Loft L',
        unitNumber: 'L303',
        description: 'Modern loft',
        price: 350000,
        bedrooms: 2,
        bathrooms: 2,
        area: 100,
        images: ['apt14.jpg', 'apt14.jpg'],
        project: 'Project Z',
        developer: 'DevWorks',
        finishing: FinishingState.FULLY_FINISHED,
        deliveryDate: new Date('2025-03-01'),
        street: 'Third St',
        city: 'Chicago',
        country: 'USA',
        amenities: [],
      };

      const apartmentCreated: Apartment = {
        id: '456',
        ...createData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (repository.create as jest.Mock).mockResolvedValue(apartmentCreated);

      // Act
      const result = await service.create(createData);

      // Assert
      expect(repository.create).toHaveBeenCalledWith(createData);
      expect(result).toEqual(apartmentCreated);
    });
  });
});
