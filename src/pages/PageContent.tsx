import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";
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

	const navigate = useNavigate();
	const location = useLocation();

	if (showResults && location.pathname !== "/results")
		navigate("/results", { replace: true });
	else if (!showResults && location.pathname === "/results")
		navigate("/", { replace: true });

	const setShowResultsWrapper = (value: boolean) => {
		setShowResults(value);
		if (value) navigate("/results");
		else navigate("/");
	};

	const handleTakeAnotherSurveyWithRoute = () => {
		handleTakeAnotherSurvey();
		navigate("/");
	};

	return (
		<>
			<Routes>
				<Route
					path="/"
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
					path="/results"
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

				<Route path="*" element={<Navigate replace to="/" />} />
			</Routes>
			<GraphIcon />
			<ChatIcon />
		</>
	);
}
