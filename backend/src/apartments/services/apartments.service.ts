import { Injectable } from '@nestjs/common';
import { ApartmentRepository } from '../repository/apartments.repository';
import { CreateApartmentDto } from '../dto/create-apartment.dto';
import { Apartment } from '../entities/apartment.entity';
import { FindApartmentsDto } from '../dto/find-apartments.dto';

@Injectable()
export class ApartmentsService {
  constructor(private readonly apartmentRepository: ApartmentRepository) {}

  async create(data: CreateApartmentDto): Promise<Apartment> {
    return this.apartmentRepository.create(data);
  }

  async findOne(id: string): Promise<Apartment | null> {
    return this.apartmentRepository.findOne(id);
  }

  async findManyPaginated(filters: FindApartmentsDto): Promise<{
    data: Apartment[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const { unitName, unitNumber, project, page, limit } = filters;

    const orConditions = [];
    if (unitName) {
      orConditions.push({
        unitName: { contains: unitName, mode: 'insensitive' },
      });
    }
    if (unitNumber) {
      orConditions.push({
        unitNumber: { contains: unitNumber, mode: 'insensitive' },
      });
    }
    if (project) {
      orConditions.push({
        project: { contains: project, mode: 'insensitive' },
      });
    }

    const whereClause = orConditions.length ? { OR: orConditions } : {};

    const pageNumber = page || 1;
    const pageSize = limit || 10;
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    const [apartments, total] = await Promise.all([
      this.apartmentRepository.findMany(whereClause, skip, take),
      this.apartmentRepository.count(whereClause),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      data: apartments,
      meta: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages,
      },
    };
  }
}
