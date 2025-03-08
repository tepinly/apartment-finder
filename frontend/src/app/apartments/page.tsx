'use client'

import Link from 'next/link'
import Image from 'next/image'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import EnlistButton from '@/components/EnlistButton'
import { useSearchParams } from 'next/navigation'
import { useApartments } from './hooks/useApartments'
import { Apartment } from './model'
import { Suspense } from 'react'

function ApartmentsContent() {
	const searchParams = useSearchParams()
	const params = {
		unitName: searchParams.get('unitName') || '',
		unitNumber: searchParams.get('unitNumber') || '',
		project: searchParams.get('project') || '',
		page: searchParams.get('page') || '1',
		limit: searchParams.get('limit') || '10',
	}

	const { data, error, isLoading } = useApartments(params)

	if (isLoading) return <p>Loading apartments...</p>
	if (error) return <p>Error: {(error as Error).message}</p>

	const { data: apartments, meta } = data

	return (
		<div className="container mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Apartments List</h1>
				<Link href="/apartments/new">
					<EnlistButton type="button" text="+ Enlist Apartment" />
				</Link>
			</div>

			<div className="mb-6">
				<SearchBar />
				<p className="mb-4 text-gray-600">
					Showing {apartments.length} of {meta.total} apartments
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
				{apartments.map((apt: Apartment) => (
					<Link
						key={apt.id}
						href={`/apartments/${apt.id}`}
						className="block border rounded-lg shadow-md overflow-hidden"
					>
						<Image
							src={apt.images.length > 0 ? apt.images[0] : '/apt7.jpg'}
							alt={apt.unitName}
							width={400}
							height={250}
							className="w-full h-60 object-cover"
						/>
						<div className="p-4">
							<h2 className="text-xl font-semibold">{apt.unitName}</h2>
							<p className="text-gray-600">
								{apt.city}, {apt.country}
							</p>
							<p className="text-lg font-bold mt-2">
								${apt.price.toLocaleString()}
							</p>
							<p className="text-sm text-gray-500">
								{apt.bedrooms} Beds • {apt.bathrooms} Baths • {apt.area} sqm
							</p>
						</div>
					</Link>
				))}
			</div>

			<Pagination
				currentPage={Number(params.page)}
				limit={Number(params.limit)}
				totalPages={meta.totalPages}
			/>
		</div>
	)
}

export default function ApartmentsPage() {
	return (
		<Suspense fallback={<div>Loading apartments...</div>}>
			<ApartmentsContent />
		</Suspense>
	)
}
