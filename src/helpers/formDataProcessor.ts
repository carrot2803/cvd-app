import { numericalFields, orderedKeys } from "../utils/data";

export const processFormData = (Data: Record<string, any>) => {
	const data = { ...Data };

	numericalFields.forEach((field) => {
		data[field] = parseInt(data[field], 10);
	});

	let age = parseInt(data["AgeCategory"], 10);
	if (age >= 80) data["AgeCategory"] = 13;
	else data["AgeCategory"] = Math.floor((age - 18) / 5) + 1;

	const feet = parseInt(data["HeightFeet"], 10) || 0;
	const inches = parseInt(data["HeightInches"], 10) || 0;
	data["HeightInMeters"] = (feet * 12 + inches) * 0.0254;
	const pounds = parseFloat(data["WeightPounds"]) || 0;
	data["WeightInKilograms"] = pounds * 0.453592;
	data["BMI"] = data["WeightInKilograms"] / data["HeightInMeters"] ** 2;
	data["GeneralHealth"] = computeGeneralHealthScore(data);
	data["HadAsthma"] = data["HadAsthma"] === 1 ? 0 : 1;

	const orderedData: Record<string, any> = {};
	orderedKeys.forEach((key) => {
		orderedData[key] = data[key];
	});

	return orderedData;
};

function computeGeneralHealthScore(data: Record<string, number>) {
	let score = 4;
	const normalizedHadAsthma = data.HadAsthma === 1 ? 1 : 0;
	const normalizedHadDiabetes = [1, 2].includes(data.HadDiabetes) ? 1 : 0;
	const chronicConditions = [
		normalizedHadAsthma,
		data.HadCOPD || 0,
		data.HadKidneyDisease || 0,
		data.HadArthritis || 0,
		normalizedHadDiabetes,
	];
	const chronicCount = chronicConditions.reduce((sum, val) => sum + val, 0);

	// Apply penalty logic
	if (chronicCount >= 2) score -= 1;
	if (chronicCount >= 4) score -= 1;
	if (data.SmokerStatus >= 2 || data.AlcoholDrinkers === 1) score -= 1;
	if (!data.PhysicalActivities) score -= 1;
	if (data.BMI < 18.5 || data.BMI >= 30) score -= 1;
	if (data["Sensory Impairments"] === 1 || data["Mobility"] === 1) score -= 1;
	if (data.AgeCategory > 8) score -= 1;

	return Math.max(1, Math.min(4, score));
}
