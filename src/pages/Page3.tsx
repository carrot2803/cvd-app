import { RadioQuestion } from "../components/RadioQuestion";
import { SurveyPageLayout } from "../components/ServerLayout";

export default function Page3({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    return (
        <SurveyPageLayout title="MEDICAL HISTORY & CHRONIC CONDITIONS" pageNumber={3} totalPages={4} onNext={onNext} onBack={onBack}>
            <RadioQuestion question="Do you have any sensory impairments ?" name="Sensory Impairments" />
            <RadioQuestion question="Have you ever been diagnosed with Arthritis ?" name="HadArthritis" />
            <RadioQuestion question="Have you been diagnosed with High Cholesterol ?" name="HaveHighCholesterol" />
            <RadioQuestion question="Are you vaccinated (e.g., for COVID-19, pneumonia, flu) ?" name="Vaccinated" />
        </SurveyPageLayout>
    );
}