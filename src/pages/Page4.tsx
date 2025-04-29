import { RadioQuestion } from "../components/RadioQuestion";
import { SurveyPageLayout } from "../components/SurveyLayout";
import { useState, useEffect } from "react";

interface Props {
	formData: Record<string, any>;
	submit: () => void;
	onBack: () => void;
	onFormDataChange?: (updatedFormData: Record<string, any>) => void;
}

export default function Page4({
	formData,
	submit,
	onBack,
	onFormDataChange,
}: Props) {
	const [localFormData, setLocalFormData] = useState(formData || {});

	useEffect(() => {
		setLocalFormData(formData || {});
	}, [formData]);

	const handleChange = (name: string, value: string) => {
		const updatedFormData = {
			...localFormData,
			[name]: value,
		};
		setLocalFormData(updatedFormData);

		if (onFormDataChange) onFormDataChange(updatedFormData);
	};

	const handleBack = () => {
		if (onFormDataChange) onFormDataChange(localFormData);
		onBack();
	};

	console.log("Page 4", localFormData);

	return (
		<SurveyPageLayout
			title="MEDICAL HISTORY & CHRONIC CONDITIONS"
			pageNumber={4}
			totalPages={4}
			onSubmit={submit}
			onBack={handleBack}
			isLastPage={true}
		>
			<RadioQuestion
				question="Have you ever been diagnosed with Asthma?"
				name="HadAsthma"
				defaultValue={localFormData.HadAsthma ?? "0"}
				onChange={handleChange}
			/>
			<RadioQuestion
				question="Have you ever been diagnosed with COPD?"
				name="HadCOPD"
				defaultValue={localFormData.HadCOPD ?? "0"}
				onChange={handleChange}
			/>
			<RadioQuestion
				question="Have you been diagnosed with High Cholesterol?"
				name="HaveHighCholesterol"
				defaultValue={localFormData.HaveHighCholesterol ?? "0"}
				onChange={handleChange}
			/>
			<RadioQuestion
				question="Have you ever been diagnosed with Kidney Disease?"
				name="HadKidneyDisease"
				defaultValue={localFormData.HadKidneyDisease ?? "0"}
				onChange={handleChange}
			/>
		</SurveyPageLayout>
	);
}
