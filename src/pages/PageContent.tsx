import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Results from "./Results";
import Survey from "./Survey.tsx";
import { useFormState } from "../hooks/useFormState";
import ChatIcon from "../components/ChatIcon";
import GraphIcon from "../components/GraphIcon";

export default function PageContent() {
	const {
		page,
		formData,
		probability,
		topFeatures,
		setProbability,
		setTopFeatures,
		setShowResults,
		handleNext,
		handleBack,
		handleTakeAnotherSurvey,
		updateFormData,
	} = useFormState();

	const navigate = useNavigate();

	const setShowResultsWrapper = (value: boolean) => {
		setShowResults(value);
		if (value) navigate("/cvd-app/results");
	};

	const handleTakeAnotherSurveyWithRoute = () => {
		handleTakeAnotherSurvey();
		navigate("/cvd-app", { replace: true });
	};

	return (
		<>
			<Routes>
				<Route
					path="/cvd-app"
					element={
						<Survey
							page={page}
							formData={formData}
							handleNext={handleNext}
							handleBack={handleBack}
							setShowResults={setShowResultsWrapper}
							setProbability={setProbability}
							updateFormData={updateFormData}
							setTopFeatures={setTopFeatures}
						/>
					}
				/>

				<Route
					path="/cvd-app/results"
					element={
						<Results
							probability={probability}
							onTakeAnotherSurvey={
								handleTakeAnotherSurveyWithRoute
							}
							topFeatures={topFeatures}
						/>
					}
				/>

				<Route path="*" element={<Navigate replace to="/cvd-app" />} />
			</Routes>
			<GraphIcon />
			<ChatIcon />
		</>
	);
}
