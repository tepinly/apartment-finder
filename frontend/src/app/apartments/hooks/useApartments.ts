import { useQuery } from '@tanstack/react-query'

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
	developer: string
	project?: string
	finishing: string
	deliveryDate: string
	street: string
	city: string
	country: string
	amenities: string[]
	createdAt: string
	updatedAt: string
}

const fetchApartments = async (query: string) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL
	if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not set')
	const res = await fetch(`${API_URL}/apartments?${query}`)
	if (!res.ok) throw new Error('Failed to fetch apartments')
	return res.json()
}

export function useApartments(params: {
	unitName?: string
	unitNumber?: string
	project?: string
	page?: string
	limit?: string
}) {
	const query = new URLSearchParams({
		unitName: params.unitName || '',
		unitNumber: params.unitNumber || '',
		project: params.project || '',
		page: params.page || '1',
		limit: params.limit || '10',
	}).toString()

	return useQuery({
		queryKey: ['apartments', query],
		queryFn: () => fetchApartments(query),
		staleTime: 1000 * 60 * 30, // cache for 30 minutes
	})
}
