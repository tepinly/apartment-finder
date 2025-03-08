import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
	return (
		<div className="mb-4">
			<label className="block font-semibold mb-1">{label}</label>
			<input
				{...props}
				className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
			/>
		</div>
	)
}
