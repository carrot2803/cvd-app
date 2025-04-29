export const collectFormData = (formId: string): Record<string, any> => {
	const form = document.getElementById(formId) as HTMLFormElement;
	if (!form) return {};

	const formData = new FormData(form);
	const data: Record<string, any> = {};

	formData.forEach((value, key) => {
		data[key] = value;
	});

	return data;
};
