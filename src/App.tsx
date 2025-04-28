import './index.css'

function App() {
	return (
		<div className="bg-gray-100 flex items-center justify-center min-h-screen font-[Poppins]">
			<div className="w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 mx-4">
				<h1 className="text-2xl text-gray-700 font-bold mb-6 text-center">Healthcare Survey</h1>

				<div id="healthSurveyForm">
					<form id="page-1" className="survey-page">
						<div className="text-md font-bold text-blue-600 mb-4">DEMOGRAPHICS AND GENERAL HEALTH</div>

						<div className="flex flex-col md:flex-row md:space-x-4">
							<div className="mb-4 md:w-1/2">
								<label htmlFor="Sex" className="block text-gray-700 text-sm mb-2">
									Sex
								</label>
								<select
									id="Sex"
									name="Sex"
									className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline"
								>
									<option value="">Select Sex</option>
									<option value="1">Male</option>
									<option value="0">Female</option>
								</select>
							</div>

							<div className="mb-4 md:w-1/2">
								<label htmlFor="AgeCategory" className="block text-gray-700 text-sm mb-2">
									Age
								</label>
								<input
									type="number"
									id="AgeCategory"
									name="AgeCategory"
									min="18"
									max="400"
									placeholder="e.g., 18"
									className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
								/>
							</div>
						</div>

						<div className="flex flex-col md:flex-row md:space-x-4">
							<div className="mb-4 md:w-2/3">
								<label htmlFor="HeightFeet" className="block text-gray-700 text-sm mb-2">
									Height (Feet & Inches)
								</label>
								<div className="flex space-x-4">
									<input
										type="number"
										id="HeightFeet"
										name="HeightFeet"
										min="0"
										placeholder="Feet"
										className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
									/>
									<input
										type="number"
										id="HeightInches"
										name="HeightInches"
										min="0"
										max="11"
										placeholder="Inches"
										className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
									/>
								</div>
							</div>

							<div className="mb-4 md:w-1/3">
								<label htmlFor="WeightPounds" className="block text-gray-700 text-sm mb-2">
									Weight (lbs)
								</label>
								<input
									type="number"
									id="WeightPounds"
									name="WeightPounds"
									step="0.1"
									min="0"
									placeholder="e.g., 150"
									className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
								/>
							</div>
						</div>

						<div className="mb-4">
							<label htmlFor="Mobility" className="block text-gray-700 text-sm mb-2">
								How would you describe your mobility ?
							</label>
							<select
								id="Mobility"
								name="Mobility"
								className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline-none"
							>
								<option value="">Select an option</option>
								<option value="0">No Difficulty</option>
								<option value="1">Some Difficulty</option>
								<option value="1">Limited Mobility</option>
							</select>
						</div>

						<div className="flex justify-between mt-8 text-sm">
							<div className="flex items-center w-1/3"></div>
							<div className="text-gray-700 flex items-center justify-center w-1/3">
								1 of 5
							</div>
							<div className="flex items-center justify-end w-1/3">
								<button
									type="submit"
									className="bg-blue-600 border-2 border-blue-600 text-white hover:bg-blue-800 hover:border-blue-800 font-bold py-1 px-4 rounded-md focus:outline-none focus:shadow-outline"
								>
									Next
								</button>
							</div>
						</div>
					</form>
					<form id="page-2" className="survey-page">
						<div className="section-label">SUBSTANCE USE & METABOLIC HEALTH</div>

						<div className="mb-4">
							<label htmlFor="SmokerStatus" className="general-question-label">Do you smoke?</label>
							<select id="SmokerStatus" name="SmokerStatus" className="selection-options">
								<option value="">Select your smoking habit</option>
								<option value="1">Smoke daily</option>
								<option value="2">Smoke occasionally</option>
								<option value="3">Used to smoke</option>
								<option value="4">Never smoked</option>
							</select>
						</div>

						<div className="mb-4">
							<label htmlFor="AlcoholDrinkers" className="general-question-label">Do you consume alcohol?</label>
							<select id="AlcoholDrinkers" name="AlcoholDrinkers" className="selection-options">
								<option value="">Select an option</option>
								<option value="1">Yes</option>
								<option value="0">No</option>
								<option value="1" > Occasionally</option >
							</select >
						</div >

						<div className="mb-4">
							<label htmlFor="HadDiabetes" className="general-question-label">
								Have you ever been diagnosed with Diabetes ?
							</label>
							<select id="HadDiabetes" name="HadDiabetes" className="selection-options">
								<option value="">Select an option</option>
								<option value="1">Yes</option>
								<option value="2">Yes but only during pregnancy</option>
								<option value="3">No</option>
								<option value="4">No but pre-diabetes</option>
							</select>
						</div>

						<div className="navigation-section">
							<div className="nav-btn">
								<button type="button" className="back-btn">
									Back
								</button>
							</div>
							<div className="status-bar">
								3 of 5
							</div>
							<div className="nav-next-btn">
								<button type="submit" className="next-btn">
									Next
								</button>
							</div>
						</div>
					</form >
				</div >
			</div >
		</div >
	)
}

export default App
