import Link from 'next/link'
import { HiHome, HiChevronRight } from 'react-icons/hi'

export type BreadcrumbItem = {
	label: string
	href?: string
}

export type BreadcrumbsProps = {
	items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav className="flex items-center text-gray-600 text-sm">
			{items.map((item, index) => {
				const isLast = index === items.length - 1
				return (
					<div key={index} className="flex items-center">
						{index === 0 ? (
							<Link
								href={item.href || '#'}
								className="flex items-center hover:underline"
							>
								<HiHome className="mr-1" />
								<span>{item.label}</span>
							</Link>
						) : item.href && !isLast ? (
							<Link href={item.href}>
								<span>{item.label}</span>
							</Link>
						) : (
							<span>{item.label}</span>
						)}
						{!isLast && <HiChevronRight className="mx-2" />}
					</div>
				)
			})}
		</nav>
	)
}
