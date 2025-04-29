import { useState } from "react";

export function useFormState() {
	const [page, setPage] = useState(1);
	const [formData, setFormData] = useState<Record<string, any>>({});
	const [probability, setProbability] = useState<string | null>(null);
	const [showResults, setShowResults] = useState(false);
	const [topFeatures, setTopFeatures] = useState<Array<[string, number]> | null>(null);

	const handleNext = (pageData: Record<string, any> = {}) => {
		setFormData((prev) => ({ ...prev, ...pageData }));
		setPage((prev) => prev + 1);
	};

	const handleBack = () => {
		setPage((prev) => prev - 1);
	};

	const updateFormData = (newData: Record<string, any>) => {
		setFormData((prev) => ({ ...prev, ...newData }));
	};

	const handleTakeAnotherSurvey = () => {
		setShowResults(false);
		setPage(1);
		setFormData({});
		setProbability(null);
		setTopFeatures(null);
	};

	return {
		page,
		formData,
		probability,
		showResults,
		topFeatures,
		setFormData,
		updateFormData,
		setProbability,
		setShowResults,
		setTopFeatures,
		handleNext,
		handleBack,
		handleTakeAnotherSurvey,
	};
}