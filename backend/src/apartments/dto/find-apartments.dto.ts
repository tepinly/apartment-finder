import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindApartmentsDto {
  @IsOptional()
  @IsString()
  unitName?: string;

  @IsOptional()
  @IsString()
  unitNumber?: string;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
