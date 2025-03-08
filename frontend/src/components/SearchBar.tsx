'use client'

import { useState } from 'react'
import { HiOutlineRefresh, HiOutlineSearch } from 'react-icons/hi'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [unitName, setUnitName] = useState(searchParams.get('unitName') || '')
	const [unitNumber, setUnitNumber] = useState(
		searchParams.get('unitNumber') || ''
	)
	const [project, setProject] = useState(searchParams.get('project') || '')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const query = new URLSearchParams()
		if (unitName) query.set('unitName', unitName)
		if (unitNumber) query.set('unitNumber', unitNumber)
		if (project) query.set('project', project)

		query.set('page', '1')
		router.push(`/apartments?${query.toString()}`)
	}

	const handleReset = () => {
		setUnitName('')
		setUnitNumber('')
		setProject('')

		router.push(`/apartments?page=1&limit=3`)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mb-6 flex flex-col sm:flex-row gap-4"
		>
			<input
				type="text"
				placeholder="Unit Name"
				value={unitName}
				onChange={(e) => setUnitName(e.target.value)}
				className="border p-2 rounded w-full"
			/>
			<input
				type="text"
				placeholder="Unit Number"
				value={unitNumber}
				onChange={(e) => setUnitNumber(e.target.value)}
				className="border p-2 rounded w-full"
			/>
			<input
				type="text"
				placeholder="Project"
				value={project}
				onChange={(e) => setProject(e.target.value)}
				className="border p-2 rounded w-full"
			/>
			<div className="flex gap-2">
				<button
					type="submit"
					className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded"
				>
					<HiOutlineSearch className="h-5 w-5" />
				</button>
				<button
					type="button"
					onClick={handleReset}
					className="bg-gray-200 hover:bg-gray-100 text-gray-500 px-4 py-2 rounded flex items-center gap-2"
				>
					<HiOutlineRefresh className="h-5 w-5" />
				</button>
			</div>
		</form>
	)
}
