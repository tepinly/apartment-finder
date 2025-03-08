import {
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsArray,
  IsDate,
} from 'class-validator';
import {
  FinishingState,
  Amenity,
  FinishingStateEnum,
  AmenityEnum,
} from '../entities/apartment.entity';
import { Type } from 'class-transformer';

export class CreateApartmentDto {
  @IsString()
  unitName: string;

  @IsString()
  unitNumber: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  price: number;

  @IsInt()
  bedrooms: number;

  @IsInt()
  bathrooms: number;

  @IsInt()
  area: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsString()
  project?: string;

  @IsString()
  developer: string;

  @IsEnum(FinishingStateEnum)
  finishing: FinishingState;

  @IsDate()
  @Type(() => Date)
  deliveryDate: Date;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsArray()
  @IsEnum(AmenityEnum, { each: true })
  amenities: Amenity[];
}
