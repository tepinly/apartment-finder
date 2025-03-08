import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApartmentsService } from '../services/apartments.service';
import { CreateApartmentDto } from '../dto/create-apartment.dto';
import { FindApartmentsDto } from '../dto/find-apartments.dto';

@Controller({ path: 'apartments', version: '1' })
export class ApartmentsControllerV1 {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  create(@Body() createApartmentDto: CreateApartmentDto) {
    console.log('Creating apartment:', createApartmentDto);
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartmentsService.findOne(id);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findManyPaginated(@Query() filters: FindApartmentsDto) {
    return this.apartmentsService.findManyPaginated(filters);
  }
}
