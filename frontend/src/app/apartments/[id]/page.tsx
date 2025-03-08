'use client'

import Image from 'next/image'
import { format } from 'date-fns'
import { useApartment } from '../hooks/useApartment'
import { useParams } from 'next/navigation'
import AmenityTag from '@/components/AmenityTag'
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs'
import { Suspense } from 'react'

const finishingMapping: Record<string, string> = {
	UNFINISHED: 'Unfinished',
	SEMI_FINISHED: 'Semi Finished',
	FULLY_FINISHED: 'Fully Finished',
}

function ApartmentContent() {
	const params = useParams()
	const { id } = params as { id: string }

	const { data: apartment, isLoading, error } = useApartment(id)

	if (isLoading) return <p>Loading apartment...</p>
	if (error) return <p>Error: {(error as Error).message}</p>
	if (!apartment) return <p>Apartment not found</p>

	const heroImage =
		apartment.images.length > 0 ? apartment.images[0] : '/apt7.jpg'

	const items: BreadcrumbItem[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Apartments', href: '/apartments' },
		{ label: apartment.unitName || 'Apartment Details' },
	]

	return (
		<div className="min-h-screen bg-black text-white">
			{/* Hero Section */}
			<div className="relative h-64 md:h-80">
				<Image
					src={heroImage}
					alt={apartment.unitName}
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent"></div>

				{/* Breadcrumbs */}
				<div className="absolute top-4 left-4 bg-white/50 px-3 py-1 rounded">
					<Breadcrumbs items={items} />
				</div>

				{/* Title and location */}
				<div className="absolute bottom-4 left-0 right-0 flex justify-center">
					<div className="px-6 md:px-20 text-center">
						<h1 className="text-4xl font-bold drop-shadow-lg">
							{apartment.unitName}
						</h1>
						<p className="text-lg mt-1 drop-shadow-md text-gray-400">
							{apartment.street}, {apartment.city}, {apartment.country}
						</p>
					</div>
				</div>
			</div>

			{/* Details Section */}
			<div className="relative-mt-8 rounded-t-3xl bg-black pt-10 pb-10 px-6 md:px-20 shadow-lg">
				<div className="max-w-4xl mx-auto space-y-8">
					{/* Price & Basic Info */}
					<div className="flex flex-col md:flex-row justify-between">
						<div>
							<h2 className="text-3xl font-semibold">
								${apartment.price.toLocaleString()}
							</h2>
							<p className="mt-1 text-lg text-gray-400">
								{apartment.bedrooms} Beds • {apartment.bathrooms} Baths •{' '}
								{apartment.area} sqm
							</p>
						</div>
						<div className="text-left">
							<p>
								Finishing -{' '}
								<span className="font-medium text-gray-400">
									{finishingMapping[apartment.finishing]}
								</span>
							</p>
							<p>
								Delivery -{' '}
								<span className="font-medium text-gray-400">
									{format(new Date(apartment.deliveryDate), 'MMMM yyyy')}
								</span>
							</p>
						</div>
					</div>

					{/* Horizontal Gallery */}
					{apartment.images.length > 0 && (
						<div>
							<h3 className="text-2xl font-semibold mb-4">Gallery</h3>
							<div className="flex space-x-4 overflow-x-auto pb-4">
								{apartment.images.map((img: string, idx: number) => (
									<div
										key={idx}
										className="min-w-[300px] relative rounded-xl overflow-hidden shadow-md"
									>
										<Image
											src={img}
											alt={`Gallery image ${idx + 2}`}
											width={300}
											height={200}
											className="object-cover transition-transform duration-300 hover:scale-105"
										/>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Description */}
					<div>
						<h3 className="text-2xl font-semibold mb-2">Description</h3>
						<p className="leading-relaxed text-gray-400">
							{apartment.description || 'No description available.'}
						</p>
					</div>

					{/* Developer & Project */}
					<div className="flex flex-col md:flex-row justify-between">
						<div>
							<h3 className="text-2xl font-semibold mb-2">Developer</h3>
							<p className="text-gray-400">{apartment.developer}</p>
						</div>
						{apartment.project && (
							<div>
								<h3 className="text-2xl font-semibold mb-2">Project</h3>
								<p className="text-gray-400">{apartment.project}</p>
							</div>
						)}
					</div>

					{/* Amenities */}
					<div>
						<h3 className="text-2xl font-semibold mb-4">Amenities</h3>
						<div className="flex flex-wrap gap-3">
							{apartment.amenities.length > 0 ? (
								apartment.amenities.map((amenity: string, idx: number) => (
									<AmenityTag key={idx} amenity={amenity} />
								))
							) : (
								<p>No amenities listed.</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function ApartmentDetails() {
	return (
		<Suspense fallback={<div>Loading apartment details...</div>}>
			<ApartmentContent />
		</Suspense>
	)
}
