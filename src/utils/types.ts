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

interface Message {
	id: number;
	text: string;
	isUser: boolean;
	isLoading?: boolean;
}

interface PageProps {
	formData: Record<string, any>;
	submit?: () => void;
	onBack?: () => void;
	onNext?: () => void;
	onFormDataChange?: (updatedFormData: Record<string, any>) => void;
}

interface YesNoRadioOptionProps {
	name: string;
	value: string;
	onChange?: (name: string, value: string) => void;
}

interface RadioQuestionProps {
	question: string;
	name: string;
	defaultValue: string;
	onChange?: (name: string, value: string) => void;
}

export type {
	PageNavigationProps,
	SurveyPageProps,
	FormSubmitProps,
	SurveyProps,
	PageProps,
	Message,
	YesNoRadioOptionProps,
	RadioQuestionProps,
};
