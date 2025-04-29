import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";
import Page4 from "../pages/Page4";
import { collectFormData } from "../helpers/formUtils";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { SurveyProps } from "../utils/types";

export default function Survey({
	page,
	formData,
	handleNext,
	handleBack,
	setShowResults,
	setProbability,
	updateFormData,
	setTopFeatures,
}: SurveyProps) {
	const { handleSubmit } = useFormSubmit({
		formData,
		setShowResults,
		setProbability,
		setTopFeatures,
	});

	const onSubmit = async () => {
		const finalData = collectFormData("page-4");
		await handleSubmit({ ...formData, ...finalData });
	};

	return (
		<div className="bg-gray-100 flex items-center justify-center min-h-screen font-[Poppins]">
			<div className="w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 mx-4">
				<h1 className="text-2xl text-gray-700 font-bold mb-6 text-center">
					Healthcare Survey
				</h1>
				<div id="healthSurveyForm">
					{page === 1 && (
						<Page1
							formData={formData}
							onNext={() => handleNext(collectFormData("page-1"))}
						/>
					)}
					{page === 2 && (
						<Page2
							formData={formData}
							onNext={() => handleNext(collectFormData("page-2"))}
							onBack={handleBack}
						/>
					)}
					{page === 3 && (
						<Page3
							formData={formData}
							onNext={() => handleNext(collectFormData("page-3"))}
							onBack={handleBack}
							onFormDataChange={updateFormData}
						/>
					)}
					{page === 4 && (
						<Page4
							formData={formData}
							submit={onSubmit}
							onBack={handleBack}
							onFormDataChange={updateFormData}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
