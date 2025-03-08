import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { Prisma } from '@prisma/client';
import { Apartment } from '../entities/apartment.entity';

@Injectable()
export class ApartmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ApartmentCreateInput): Promise<Apartment> {
    return this.prisma.apartment.create({ data });
  }

  async findOne(id: string): Promise<Apartment | null> {
    return this.prisma.apartment.findUnique({ where: { id } });
  }

  async findMany(
    whereClause: Prisma.ApartmentWhereInput,
    skip?: number,
    take?: number,
  ): Promise<Apartment[]> {
    return this.prisma.apartment.findMany({
      where: whereClause,
      skip,
      take,
    });
  }

  async count(whereClause: Prisma.ApartmentWhereInput): Promise<number> {
    return this.prisma.apartment.count({ where: whereClause });
  }
}
