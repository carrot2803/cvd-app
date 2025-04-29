import "./index.css";
import Results from "./pages/Results";
import Survey from "./pages/Survey.tsx";
import { useFormState } from "./hooks/useFormState";

export default function App() {
	const {
		page,
		formData,
		probability,
		showResults,
		topFeatures,
		setProbability,
		setTopFeatures,
		setShowResults,
		handleNext,
		handleBack,
		handleTakeAnotherSurvey,
		updateFormData,
	} = useFormState();

	return (
		<>
			{!showResults ? (
				<Survey
					page={page}
					formData={formData}
					handleNext={handleNext}
					handleBack={handleBack}
					setShowResults={setShowResults}
					setProbability={setProbability}
					updateFormData={updateFormData}
					setTopFeatures={setTopFeatures}
				/>
			) : (
				<Results
					probability={probability}
					onTakeAnotherSurvey={handleTakeAnotherSurvey}
					topFeatures={topFeatures}
				/>
			)}
		</>
	);
}