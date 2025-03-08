-- CreateEnum
CREATE TYPE "Amenity" AS ENUM ('POOL', 'GYM', 'CLUB', 'PARKING', 'SECURITY', 'LANDLINE', 'ELEVATOR', 'BALCONY', 'SCHOOL', 'MEDICAL_CENTER', 'RESTAURANT');

-- CreateEnum
CREATE TYPE "FinishingState" AS ENUM ('UNFINISHED', 'SEMI_FINISHED', 'FULLY_FINISHED');

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "unitName" TEXT NOT NULL,
    "unitNumber" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "images" TEXT[],
    "developer" TEXT NOT NULL,
    "project" TEXT,
    "finishing" "FinishingState" NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "amenities" "Amenity"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);
