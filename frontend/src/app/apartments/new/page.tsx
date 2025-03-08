'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/Input'
import EnlistButton from '@/components/EnlistButton'

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

const finishingMapping: Record<string, string> = {
	UNFINISHED: 'Unfinished',
	SEMI_FINISHED: 'Semi Finished',
	FULLY_FINISHED: 'Fully Finished',
}

export default function NewApartmentPage() {
	const API_URL = process.env.NEXT_PUBLIC_API_URL
	if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not set')

	const router = useRouter()

	const [unitName, setUnitName] = useState('')
	const [unitNumber, setUnitNumber] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState(0)
	const [bedrooms, setBedrooms] = useState(0)
	const [bathrooms, setBathrooms] = useState(0)
	const [area, setArea] = useState(0)
	const [developer, setDeveloper] = useState('')
	const [project, setProject] = useState('')
	const [finishing, setFinishing] = useState('UNFINISHED')
	const [deliveryDate, setDeliveryDate] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')
	const [amenities, setAmenities] = useState<string[]>([])
	const [images, setImages] = useState<FileList | null>(null)
	const [fileCount, setFileCount] = useState(0)

	const handleAmenityChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (e.target.checked) {
			setAmenities((prev) => [...prev, value])
		} else {
			setAmenities((prev) => prev.filter((a) => a !== value))
		}
	}

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		setFileCount(files ? files.length : 0)
		setImages(files)
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const newApartment = {
			unitName,
			unitNumber,
			description,
			price,
			bedrooms,
			bathrooms,
			area,
			developer,
			project,
			finishing,
			deliveryDate,
			street,
			city,
			country,
			amenities,
			images: images ? Array.from(images).map((file) => `/${file.name}`) : [],
		}

		try {
			const res = await fetch(`${API_URL}/apartments`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newApartment),
			})

			if (res.ok) {
				router.push('/apartments')
			} else {
				console.error('Error creating apartment')
			}
		} catch (error) {
			console.error('Fetch Error: ', error)
		}
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">Add New Apartment</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Text Inputs */}
				<Input
					label="Unit Name"
					type="text"
					value={unitName}
					onChange={(e) => setUnitName(e.target.value)}
					required
				/>
				<Input
					label="Unit Number"
					type="text"
					value={unitNumber}
					onChange={(e) => setUnitNumber(e.target.value)}
					required
				/>

				{/* Description */}
				<div className="mb-4">
					<label className="block font-semibold mb-1">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows={4}
					/>
				</div>

				{/* Price, Bedrooms, Bathrooms */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Input
						label="Price"
						type="number"
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
						required
					/>
					<Input
						label="Bedrooms"
						type="number"
						value={bedrooms}
						onChange={(e) => setBedrooms(Number(e.target.value))}
						required
					/>
					<Input
						label="Bathrooms"
						type="number"
						value={bathrooms}
						onChange={(e) => setBathrooms(Number(e.target.value))}
						required
					/>
				</div>

				<Input
					label="Area (sqm)"
					type="number"
					value={area}
					onChange={(e) => setArea(Number(e.target.value))}
					required
				/>
				<Input
					label="Developer"
					type="text"
					value={developer}
					onChange={(e) => setDeveloper(e.target.value)}
					required
				/>
				<Input
					label="Project"
					type="text"
					value={project}
					onChange={(e) => setProject(e.target.value)}
				/>

				{/* Finishing Select */}
				<div>
					<label className="block font-semibold mb-1">Finishing</label>
					<select
						value={finishing}
						onChange={(e) => setFinishing(e.target.value)}
						className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					>
						{Object.entries(finishingMapping).map(([key, value]) => (
							<option key={key} value={key} className="text-gray-900">
								{value}
							</option>
						))}
					</select>
				</div>

				<Input
					label="Delivery Date"
					type="date"
					value={deliveryDate}
					onChange={(e) => setDeliveryDate(e.target.value)}
					required
				/>
				<Input
					label="Street"
					type="text"
					value={street}
					onChange={(e) => setStreet(e.target.value)}
					required
				/>
				<Input
					label="City"
					type="text"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					required
				/>
				<Input
					label="Country"
					type="text"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					required
				/>

				{/* Amenities Checkboxes */}
				<div className="mb-4">
					<label className="block font-semibold mb-1">Amenities</label>
					<div className="flex flex-wrap gap-4">
						{Object.entries(amenityMapping).map(([key, label]) => (
							<label key={key} className="flex items-center">
								<input
									type="checkbox"
									value={key}
									onChange={handleAmenityChange}
									className="mr-2"
								/>
								{label}
							</label>
						))}
					</div>
				</div>

				{/* Image File Input */}
				<div>
					<label
						htmlFor="file-upload"
						className="cursor-pointer bg-white hover:text-gray-700 text-gray-900 px-4 py-2 rounded inline-block"
					>
						{fileCount > 0 ? `${fileCount} image(s) selected` : 'Choose Images'}
					</label>
					<input
						type="file"
						id="file-upload"
						multiple
						accept="image/*"
						onChange={handleImageChange}
						className="hidden"
					/>
					<p className="text-gray-500 text-sm">
						Uploaded images are saved as strings, this is only a demo
					</p>
				</div>

				{/* Buttons */}
				<div className="flex flex-wrap gap-4">
					<div>
						<EnlistButton type="submit" text="Enlist" />
					</div>
				</div>
			</form>
		</div>
	)
}
