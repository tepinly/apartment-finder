import {
  Amenity as PrismaAmenity,
  FinishingState as PrismaFinishingState,
} from '@prisma/client';

export const AmenityEnum = PrismaAmenity;
export type Amenity = (typeof AmenityEnum)[keyof typeof AmenityEnum];

export const FinishingStateEnum = PrismaFinishingState;
export type FinishingState =
  (typeof FinishingStateEnum)[keyof typeof FinishingStateEnum];

export type Apartment = {
  id: string;
  unitName: string;
  unitNumber: string;
  description?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  developer: string;
  project?: string;
  finishing: FinishingState;
  deliveryDate: Date;
  street: string;
  city: string;
  country: string;
  amenities: Amenity[];
  createdAt: Date;
  updatedAt: Date;
};
