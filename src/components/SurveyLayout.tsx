import { SurveyPageProps } from "../utils";
import { PageNavigation } from "./Navigation";

export function SurveyPageLayout({
    title,
    children,
    pageNumber,
    totalPages,
    onNext,
    onBack,
    onSubmit,
    isLastPage = false
}: SurveyPageProps) {
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isLastPage && onSubmit)
            onSubmit();
        else if (onNext)
            onNext();
    };

    return (
        <form id={`page-${pageNumber}`} className="survey-page" onSubmit={handleSubmit}>
            <div className="text-md font-bold text-blue-600 mb-4">{title}</div>
            {children}
            <PageNavigation
                pageNumber={pageNumber}
                totalPages={totalPages}
                onNext={onNext}
                onBack={onBack}
                onSubmit={onSubmit}
                isLastPage={isLastPage}
            />
        </form>
    );
}