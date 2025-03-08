'use client'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'
import { Suspense } from 'react'

function HomeContent() {
	return (
		<div className="min-h-screen bg-black">
			<div className="relative h-[50vh]">
				<Image
					src="/default.jpg"
					alt="Hero background"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 flex justify-center">
					<h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
						Find Your Apartment
					</h1>
				</div>
			</div>

			<div className="relative-mt-12 rounded-t-3xl bg-black pt-10 pb-10 px-6 md:px-20">
				<div className="flex flex-col items-center">
					<SearchBar />
					<Link href="/apartments">
						<button className="mt-6 bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition">
							Browse Apartments
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default function HomePage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<HomeContent />
		</Suspense>
	)
}
