import { Module } from '@nestjs/common';
import { ApartmentsService } from './services/apartments.service';
import { ApartmentsControllerV1 } from './controllers/apartments.controller.v1';
import { PrismaModule } from '../prisma/prisma.module';
import { ApartmentRepository } from './repository/apartments.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ApartmentsControllerV1],
  providers: [ApartmentsService, ApartmentRepository],
  exports: [ApartmentRepository],
})
export class ApartmentsModule {}
