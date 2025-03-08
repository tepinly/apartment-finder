const amenityMapping: Record<string, string> = {
	POOL: 'Pool',
	GYM: 'Gym',
	CLUB: 'Club',
	PARKING: 'Parking',
	SECURITY: 'Security',
	LANDLINE: 'Landline',
	ELEVATOR: 'Elevator',
	BALCONY: 'Balcony',
	SCHOOL: 'School',
	MEDICAL_CENTER: 'Medical Center',
	RESTAURANT: 'Restaurant',
}

export default function AmenityTag({ amenity }: { amenity: string }) {
	return (
		<span className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-full text-sm">
			{amenityMapping[amenity]}
		</span>
	)
}
