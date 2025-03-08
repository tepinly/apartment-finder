'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type PaginationProps = {
	currentPage: number
	limit: number
	totalPages: number
}

export default function Pagination({
	currentPage,
	totalPages,
}: PaginationProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handlePageChange = (newPage: number) => {
		const query = new URLSearchParams(searchParams.toString())
		query.set('page', newPage.toString())
		router.push(`/apartments?${query.toString()}`)
	}

	return (
		<div className="flex justify-center items-center mt-6 gap-2 text-gray-300">
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage <= 1}
				className="px-3 py-1 rounded disabled:opacity-50 hover:text-white"
			>
				Prev
			</button>
			<span>
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage >= totalPages}
				className="px-3 py-1 rounded disabled:opacity-50 hover:text-white"
			>
				Next
			</button>
		</div>
	)
}
