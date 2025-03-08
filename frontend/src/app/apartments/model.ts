export type Apartment = {
	id: string
	unitName: string
	unitNumber: string
	description?: string
	price: number
	bedrooms: number
	bathrooms: number
	area: number
	images: string[]
	project?: string
	developer: string
	finishing: 'UNFINISHED' | 'SEMI_FINISHED' | 'FULLY_FINISHED'
	deliveryDate: string
	street: string
	city: string
	country: string
	amenities: Array<
		| 'POOL'
		| 'GYM'
		| 'CLUB'
		| 'PARKING'
		| 'SECURITY'
		| 'LANDLINE'
		| 'ELEVATOR'
		| 'BALCONY'
		| 'SCHOOL'
		| 'MEDICAL_CENTER'
		| 'RESTAURANT'
	>
}
