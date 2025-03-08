# Apartment Finder App

A demo application to list and enlist apartments for sale.

## Setup

### Prerequisites

- Docker

### Installation

1. Clone the repository
2. Run `docker-compose up -d`
3. Wait for the backend container to build and start the Nest.js server, check the logs to confirm

## API Endpoints

### Apartments - V1

Base URL: `http://localhost:4000`

- **`GET /v1/apartments/:id`** - Get a single apartment by ID
- **`GET /v1/apartments`** - Get all apartments
  - Query Params:
    - `unitName` - Filter by unit name (optional)
      - `unitNumber` - Filter by unit number (optional)
      - `project` - Filter by project name (optional)
      - `page` - Page number (default: 1, min: 1)
      - `limit` - Number of items per page (default: 10, min: 1)
- **`POST /v1/apartments`** - Create a new apartment
  - Request Body:
    - `unitName` (string) - Name of the unit
    - `unitNumber` (string) - Unit number
    - `description` (string, optional) - Unit description
    - `price` (integer) - Price of the unit
    - `bedrooms` (integer) - Number of bedrooms
    - `bathrooms` (integer) - Number of bathrooms
    - `area` (integer) - Area in square meters/feet
    - `images` (string[]) - Array of image URLs
    - `project` (string, optional) - Project name
    - `developer` (string) - Developer name
    - `finishing` (enum) - Finishing state
    - `deliveryDate` (date) - Expected delivery date
    - `street` (string) - Street address
    - `city` (string) - City name
    - `country` (string) - Country name
    - `amenities` (enum[]) - Array of available amenities

## Frontend Endpoints

Base URL: `http://localhost:3000`

- **`/`** - Home page, contains a search bar
- **`/apartments`** - Apartments page, contains a paginated list of apartments and a search bar
- **`/apartments/:id`** - Apartment details page
- **`/apartments/new`** - Apartment enlistment page

## Data Models

### Enums

**Amenity**: `POOL | GYM | CLUB | PARKING | SECURITY | LANDLINE | ELEVATOR | BALCONY | SCHOOL | MEDICAL_CENTER | RESTAURANT`

**FinishingState**: `UNFINISHED | SEMI_FINISHED | FULLY_FINISHED`

### Apartment Model

| Field         | Type           | Description                    |
|---------------|----------------|--------------------------------|
| id            | String         | UUID, Primary Key              |
| unitName      | String         | Name of the unit               |
| unitNumber    | String         | Unique identifier for the unit |
| description   | String?        | Optional unit description      |
| price         | Int            | Price in currency              |
| bedrooms      | Int            | Number of bedrooms             |
| bathrooms     | Int            | Number of bathrooms            |
| area          | Int            | Size in square units           |
| images        | String[]       | Array of image URLs            |
| developer     | String         | Developer name                 |
| project       | String?        | Optional project name          |
| finishing     | FinishingState | State of finishing             |
| deliveryDate  | DateTime       | Expected delivery date         |
| street        | String         | Street address                 |
| city          | String         | City name                      |
| country       | String         | Country name                   |
| amenities     | Amenity[]      | Available amenities            |
| createdAt     | DateTime       | Record creation timestamp      |
| updatedAt     | DateTime       | Last update timestamp          |

## More details about the project

- The API uses Nest.js for the backend and Postgres for the database.
- API uses a repository - service - controller pattern.
- The database is seeded with dummy data
- The `apartments` service comes with units tests
- The frontend is built with Next.js and Tailwind CSS
- The fetched apartments are cached using React Query to sync data across the pages

### Future Improvements

- **Frontend**
  - Better error handling
  - Richer UI design

- **Backend**
  - Support image upload (Cloudflare R2, AWS S3)
  - Create a separate `developers` table
  - Create a separate `projects` table
  