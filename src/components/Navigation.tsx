import { PageNavigationProps } from "../utils";

export function PageNavigation({
	pageNumber,
	totalPages,
	onBack,
	isLastPage = false,
}: PageNavigationProps) {
	return (
		<div className="flex justify-between mt-8 text-sm">
			<div className="flex items-center w-1/3">
				{onBack && (
					<button
						type="button"
						onClick={onBack}
						className="bg-white text-blue-700 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-bold py-1 px-4 rounded-md focus:outline-none focus:shadow-outline"
					>
						Back
					</button>
				)}
			</div>
			<div className="text-gray-700 flex items-center justify-center w-1/3">
				{pageNumber} of {totalPages}
			</div>
			<div className="flex items-center justify-end w-1/3">
				<button
					type="submit"
					className="bg-blue-600 border-2 border-blue-600 text-white hover:bg-blue-800 hover:border-blue-800 font-bold py-1 px-4 rounded-md focus:outline-none focus:shadow-outline"
				>
					{isLastPage ? "Submit" : "Next"}
				</button>
			</div>
		</div>
	);
}
