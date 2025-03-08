import { useQuery } from '@tanstack/react-query'
import { Apartment } from './useApartments'

const fetchApartment = async (id: string) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL
	if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not set')

	const res = await fetch(`${API_URL}/apartments/${id}`)
	if (!res.ok) throw new Error('Apartment not found')
	return res.json()
}

export function useApartment<T = Apartment>(id: string) {
	return useQuery<T, Error>({
		queryKey: ['apartment', id],
		queryFn: () => fetchApartment(id),
		staleTime: 1000 * 60 * 30, // cache for 30 minutes
	})
}
