import { ReactNode } from "react";

type PageNavigationProps = {
	pageNumber: number;
	totalPages: number;
	onNext?: () => void;
	onBack?: () => void;
	onSubmit?: () => void;
	isLastPage?: boolean;
};

interface SurveyPageProps {
	title: string;
	children: ReactNode;
	pageNumber: number;
	totalPages: number;
	onNext?: () => void;
	onBack?: () => void;
	onSubmit?: () => void;
	isLastPage?: boolean;
}

interface FormSubmitProps {
	formData: Record<string, number>;
	setShowResults: (show: boolean) => void;
	setProbability: (value: string | null) => void;
	setTopFeatures: (features: Array<[string, number]>) => void;
}

interface SurveyProps {
	page: number;
	formData: any;
	handleNext: (data: any) => void;
	handleBack: () => void;
	setShowResults: (value: boolean) => void;
	setProbability: (value: string | null) => void;
	updateFormData: (newData: Record<string, any>) => void;
	setTopFeatures: (features: Array<[string, number]>) => void;
}

export type {
	PageNavigationProps,
	SurveyPageProps,
	FormSubmitProps,
	SurveyProps,
};
