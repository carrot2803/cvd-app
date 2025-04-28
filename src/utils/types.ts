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
	children: React.ReactNode;
	pageNumber: number;
	totalPages: number;
	onNext?: () => void;
	onBack?: () => void;
	onSubmit?: () => void;
	isLastPage?: boolean;
}

export type { PageNavigationProps, SurveyPageProps };
