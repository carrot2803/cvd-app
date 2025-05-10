import { processFormData } from "../helpers/formDataProcessor";
import { FormSubmitProps } from "../utils/types";

export function useFormSubmit({
	formData,
	setShowResults,
	setProbability,
	setTopFeatures,
}: FormSubmitProps) {
	async function handleSubmit(finalPageData: Record<string, number>) {
		const request = import.meta.env.VITE_BACKEND + "/predict/5";

		try {
			const allData = { ...formData, ...finalPageData };
			const processedData = processFormData(allData);

			const response = await fetch(request, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(processedData),
			});

			if (!response.ok)
				throw new Error("Failed to submit survey. Please try again.");

			const result = await response.json();

			setProbability(result.probability);
			setTopFeatures(result.top_features);
			setShowResults(true);
			return true;
		} catch (error) {
			console.error("Error submitting form:", error);
			return false;
		}
	}

	return { handleSubmit };
}
