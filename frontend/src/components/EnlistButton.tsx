export default function EnlistButton({
	text,
	type,
}: {
	text: string
	type: 'submit' | 'reset' | 'button' | undefined
}) {
	return (
		<button
			type={type}
			className="bg-gradient-to-r from-blue-800 to-purple-800 text-white font-bold text-sm md:text-base px-4 py-2 sm:px-5 sm:py-3 rounded-lg shadow-md transition-transform transform hover:from-blue-700 hover:to-purple-700"
		>
			{text}
		</button>
	)
}
