import { useState } from 'react';
import './index.css';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Results from './pages/Results';

export default function App() {
	const [page, setPage] = useState(1);
	const [formData, setFormData] = useState<Record<string, any>>({});
	const [probability, setProbability] = useState<string | null>(null);
	const [showResults, setShowResults] = useState(false);

	const handleNext = (pageData: Record<string, any> = {}) => {
		setFormData(prev => ({ ...prev, ...pageData }));
		setPage((prev) => prev + 1);
	};

	const handleBack = () => {
		setPage((prev) => prev - 1);
	};

	const handleSubmit = async (finalPageData: Record<string, any> = {}) => {
		try {
			const allData = { ...formData, ...finalPageData };
			const processedData = processFormData(allData);

			console.log("Submitting data to backend:", processedData);

			const response = await fetch("http://127.0.0.1:8000/predict", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(processedData)
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Response from server:", result);

				// Store probability value and show results
				const resultValue = result.message;
				setProbability(resultValue);
				setShowResults(true);
			} else {
				alert("Failed to submit survey. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert(error);
		}
	};

	// Process form data function based on your original code
	const processFormData = (data: Record<string, any>) => {
		// Create a copy to avoid mutating the original data
		const processedData = { ...data };

		// Convert necessary fields to numbers
		const numericalFields = [
			"Sex", "PhysicalHealthDays", "MentalHealthDays", "HadAsthma",
			"LastCheckupTime", "HadDiabetes", "SmokerStatus", "AgeCategory", "AlcoholDrinkers"
		];

		numericalFields.forEach(field => {
			if (field in processedData) {
				processedData[field] = parseInt(processedData[field], 10);
			}
		});

		// Process age category
		let age = parseInt(processedData["AgeCategory"], 10);
		if (age >= 80)
			processedData["AgeCategory"] = 13;
		else
			processedData["AgeCategory"] = Math.floor((age - 18) / 5) + 1;

		// Convert Height to Meters
		if ("HeightFeet" in processedData && "HeightInches" in processedData) {
			const feet = parseInt(processedData["HeightFeet"], 10) || 0;
			const inches = parseInt(processedData["HeightInches"], 10) || 0;
			processedData["HeightInMeters"] = ((feet * 12) + inches) * 0.0254;

			// Remove original height fields
			delete processedData["HeightFeet"];
			delete processedData["HeightInches"];
		}

		// Convert Weight (lbs) to Kilograms
		if ("WeightPounds" in processedData) {
			const pounds = parseFloat(processedData["WeightPounds"]) || 0;
			processedData["WeightInKilograms"] = pounds * 0.453592;
			delete processedData["WeightPounds"];
		}

		// Calculate BMI
		if ("HeightInMeters" in processedData && "WeightInKilograms" in processedData) {
			processedData["BMI"] = processedData["WeightInKilograms"] /
				(processedData["HeightInMeters"] ** 2);
		}

		// Set depressive disorder based on mental health days
		if ("MentalHealthDays" in processedData) {
			processedData["HadDepressiveDisorder"] = processedData["MentalHealthDays"] > 25 ? 1 : 0;
		}

		// Convert Yes/No fields to 1/0
		const booleanFields = [
			"PhysicalActivities", "HadSkinCancer", "HadCOPD",
			"HadKidneyDisease", "HadArthritis", "HaveHighCholesterol",
			"Sensory Impairments", "Vaccinated"
		];

		booleanFields.forEach(field => {
			if (field in processedData) {
				if (processedData[field] === "Yes") processedData[field] = 1;
				else if (processedData[field] === "No") processedData[field] = 0;
			}
		});

		// Process mobility
		if ("Mobility" in processedData) {
			processedData["Mobility"] = processedData["Mobility"] === "1" ? 1 : 0;
		}

		// Calculate general health score
		processedData["GeneralHealth"] = computeGeneralHealthScore(processedData);

		// Define the order of keys for the final object
		const orderedKeys = [
			"Sex", "GeneralHealth", "PhysicalHealthDays", "MentalHealthDays",
			"LastCheckupTime", "PhysicalActivities", "HadAsthma", "HadSkinCancer",
			"HadCOPD", "HadDepressiveDisorder", "HadKidneyDisease", "HadArthritis",
			"HadDiabetes", "SmokerStatus", "AgeCategory", "HeightInMeters",
			"WeightInKilograms", "BMI", "AlcoholDrinkers", "HaveHighCholesterol",
			"Sensory Impairments", "Vaccinated", "Mobility"
		];

		// Create ordered data object
		const orderedData: Record<string, any> = {};
		orderedKeys.forEach(key => {
			if (key in processedData) {
				orderedData[key] = processedData[key];
			}
		});

		return orderedData;
	};

	// Compute general health score function from your original code
	const computeGeneralHealthScore = (data: Record<string, any>) => {
		let score = 4;
		const normalizedHadAsthma = (data.HadAsthma === 1) ? 1 : 0;
		const normalizedHadDiabetes = [1, 2].includes(data.HadDiabetes) ? 1 : 0;
		const chronicConditions = [
			normalizedHadAsthma,
			data.HadSkinCancer || 0,
			data.HadCOPD || 0,
			data.HadKidneyDisease || 0,
			data.HadArthritis || 0,
			normalizedHadDiabetes,
			data.HadDepressiveDisorder || 0
		];
		const chronicCount = chronicConditions.reduce((sum, val) => sum + val, 0);

		// Apply penalty logic
		if (data.PhysicalHealthDays > 20 || data.MentalHealthDays > 20) score -= 1;
		if (data.PhysicalHealthDays > 27 || data.MentalHealthDays > 27) score -= 1;
		if (chronicCount >= 2) score -= 1;
		if (chronicCount >= 4) score -= 1;
		if (data.SmokerStatus >= 2 || data.AlcoholDrinkers === 1) score -= 1;
		if (!data.PhysicalActivities) score -= 1;
		if (data.BMI < 18.5 || data.BMI >= 30) score -= 1;
		if (data["Sensory Impairments"] === 1 || data["Mobility"] === 1) score -= 1;

		return Math.max(1, Math.min(4, score));
	};

	const handleTakeAnotherSurvey = () => {
		setShowResults(false);
		setPage(1);
		setFormData({});
		setProbability(null);
	};

	return (
		<>
			{!showResults ? (
				<div className="bg-gray-100 flex items-center justify-center min-h-screen font-[Poppins]">
					<div className="w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 mx-4">
						<h1 className="text-2xl text-gray-700 font-bold mb-6 text-center">Healthcare Survey</h1>
						<div id="healthSurveyForm">
							{page === 1 && <Page1 onNext={() => handleNext(collectFormData("page-1"))} />}
							{page === 2 && <Page2 onNext={() => handleNext(collectFormData("page-2"))} onBack={handleBack} />}
							{page === 3 && <Page3 onNext={() => handleNext(collectFormData("page-3"))} onBack={handleBack} />}
							{page === 4 && <Page4 submit={() => handleSubmit(collectFormData("page-4"))} onBack={handleBack} />}
						</div>
					</div>
				</div >
			) : (
				<Results probability={probability} onTakeAnotherSurvey={handleTakeAnotherSurvey} />
			)}
		</>
	);

	// Helper function to collect form data from the current page
	function collectFormData(formId: string): Record<string, any> {
		const form = document.getElementById(formId) as HTMLFormElement;
		if (!form) return {};

		const formData = new FormData(form);
		const data: Record<string, any> = {};

		formData.forEach((value, key) => {
			data[key] = value;
		});

		return data;
	}
}