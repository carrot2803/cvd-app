import { RadioQuestion } from "../components/RadioQuestion";
import { SurveyPageLayout } from "../components/SurveyLayout";
import { useState, useEffect } from "react";

interface PageProps {
	formData: Record<string, any>;
	onNext: () => void;
	onBack: () => void;
	onFormDataChange?: (updatedFormData: Record<string, any>) => void;
}

export default function Page3({
	formData,
	onNext,
	onBack,
	onFormDataChange,
}: PageProps) {
	const [localFormData, setLocalFormData] = useState(formData);

	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	const handleChange = (name: string, value: string) => {
		const updatedFormData = {
			...localFormData,
			[name]: value,
		};
		setLocalFormData(updatedFormData);

		if (onFormDataChange) {
			onFormDataChange(updatedFormData);
		}
	};

	return (
		<SurveyPageLayout
			title="MEDICAL HISTORY & CHRONIC CONDITIONS"
			pageNumber={3}
			totalPages={4}
			onNext={onNext}
			onBack={onBack}
		>
			<RadioQuestion
				question="Do you engage in regular physical activities?"
				name="PhysicalActivities"
				defaultValue={localFormData.PhysicalActivities ?? "0"}
				onChange={handleChange}
			/>
			<RadioQuestion
				question="Do you have any sensory impairments?"
				name="SensoryImpairments"
				defaultValue={localFormData.SensoryImpairments ?? "0"}
				onChange={handleChange}
			/>
			<RadioQuestion
				question="Are you vaccinated (e.g., for COVID-19, pneumonia, flu)?"
				name="Vaccinated"
				defaultValue={localFormData.Vaccinated ?? "0"}
				onChange={handleChange}
			/>
			<RadioQuestion
				question="Have you ever been diagnosed with Arthritis?"
				name="HadArthritis"
				defaultValue={localFormData.HadArthritis ?? "0"}
				onChange={handleChange}
			/>
		</SurveyPageLayout>
	);
}
