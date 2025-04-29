import { SurveyPageLayout } from "../components/SurveyLayout";

interface Props {
	onNext: () => void;
	formData: Record<string, any>;
}

export default function Page1({ onNext, formData }: Props) {
	return (
		<SurveyPageLayout
			title="DEMOGRAPHICS AND GENERAL HEALTH"
			pageNumber={1}
			totalPages={4}
			onNext={onNext}
		>
			<div className="flex flex-col md:flex-row md:space-x-4">
				<div className="mb-4 md:w-1/2">
					<label
						htmlFor="Sex"
						className="block text-gray-700 text-sm mb-2"
					>
						Sex
					</label>
					<select
						id="Sex"
						name="Sex"
						defaultValue={formData.Sex ?? ""}
						required
						className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline"
					>
						<option value="" disabled hidden>
							Select Sex
						</option>
						<option value="1">Male</option>
						<option value="0">Female</option>
					</select>
				</div>
				<div className="mb-4 md:w-1/2">
					<label
						htmlFor="AgeCategory"
						className="block text-gray-700 text-sm mb-2"
					>
						Age
					</label>
					<input
						type="number"
						id="AgeCategory"
						name="AgeCategory"
						defaultValue={formData.AgeCategory ?? ""}
						min={18}
						max={400}
						required
						placeholder="e.g., 18"
						className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row md:space-x-4">
				<div className="mb-4 md:w-2/3">
					<label
						htmlFor="HeightFeet"
						className="block text-gray-700 text-sm mb-2"
					>
						Height (Feet & Inches)
					</label>
					<div className="flex space-x-4">
						<input
							type="number"
							id="HeightFeet"
							name="HeightFeet"
							defaultValue={formData.HeightFeet ?? ""}
							min={0}
							max={8}
							required
							placeholder="Feet"
							className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
						/>
						<input
							type="number"
							id="HeightInches"
							name="HeightInches"
							defaultValue={formData.HeightInches ?? ""}
							min={0}
							max={11}
							required
							placeholder="Inches"
							className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
						/>
					</div>
				</div>
				<div className="mb-4 md:w-1/3">
					<label
						htmlFor="WeightPounds"
						className="block text-gray-700 text-sm mb-2"
					>
						Weight (lbs)
					</label>
					<input
						type="number"
						id="WeightPounds"
						name="WeightPounds"
						defaultValue={formData.WeightPounds ?? ""}
						step={0.1}
						min={0}
						max={1000}
						required
						placeholder="e.g., 150"
						className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
					/>
				</div>
			</div>
			<div className="mb-4">
				<label
					htmlFor="Mobility"
					className="block text-gray-700 text-sm mb-2"
				>
					How would you describe your mobility?
				</label>
				<select
					id="Mobility"
					name="Mobility"
					defaultValue={formData.Mobility ?? ""}
					required
					className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
				>
					<option value="" disabled hidden>
						Select an option
					</option>
					<option value="0">No Difficulty</option>
					<option value="1">Some Difficulty</option>
					<option value="2">Limited Mobility</option>
				</select>
			</div>
		</SurveyPageLayout>
	);
}
