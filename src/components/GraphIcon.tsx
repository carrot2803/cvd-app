import { useState } from "react";
import { plotOptions } from "../utils";

export default function GraphIcon() {
	const [isOpen, setIsOpen] = useState(false);
	const [showPlotMenu, setShowPlotMenu] = useState(false);

	const toggleGraph = () => {
		setIsOpen(!isOpen);
		setShowPlotMenu(false);
	};

	const togglePlotMenu = () => {
		setShowPlotMenu(!showPlotMenu);
	};

	const navigateToPlot = (plotType: string) => {
		window.location.href = `/${plotType}.html`;
	};

	const GraphIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="18" y1="20" x2="18" y2="10" />
			<line x1="12" y1="20" x2="12" y2="4" />
			<line x1="6" y1="20" x2="6" y2="14" />
		</svg>
	);

	const CloseIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	);

	const BackIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="19" y1="12" x2="5" y2="12" />
			<polyline points="12 19 5 12 12 5" />
		</svg>
	);

	return (
		<div className="fixed bottom-4 right-16 sm:bottom-16 sm:right-4 z-50">
			{isOpen ? (
				<div className="bg-white rounded-lg shadow-lg flex flex-col w-64 border border-gray-200">
					<div className="bg-blue-600 text-white p-2 rounded-t-lg flex justify-between items-center">
						<span className="font-medium text-sm">
							{showPlotMenu ? (
								<div className="flex items-center">
									<button
										onClick={togglePlotMenu}
										className="mr-2 text-white hover:bg-blue-700 rounded-full p-1"
									>
										<BackIcon />
									</button>
									Plot Selection
								</div>
							) : (
								"Data Exploration"
							)}
						</span>
						<button
							onClick={toggleGraph}
							className="text-white hover:bg-blue-700 rounded-full p-1"
						>
							<CloseIcon />
						</button>
					</div>

					{showPlotMenu ? (
						<div className="p-2 flex flex-col">
							<p className="text-gray-700 text-xs mb-2 px-2">
								Select a visualization to view:
							</p>
							<div className="flex flex-col space-y-1">
								{plotOptions.map((plot, index) => (
									<button
										key={index}
										onClick={() =>
											navigateToPlot(plot.route)
										}
										className="text-left text-sm px-3 py-2 hover:bg-blue-50 rounded-md text-gray-800 transition-colors duration-150"
									>
										{plot.name}
									</button>
								))}
							</div>
						</div>
					) : (
						<div className="p-4 flex flex-col items-center">
							<p className="text-gray-700 text-sm mb-4">
								Would you like to explore your data in detail?
							</p>
							<button
								onClick={togglePlotMenu}
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
							>
								View Data Visualizations
							</button>
						</div>
					)}
				</div>
			) : (
				<button
					onClick={toggleGraph}
					className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
					aria-label="Open data explorer"
				>
					<GraphIcon />
				</button>
			)}
		</div>
	);
}
