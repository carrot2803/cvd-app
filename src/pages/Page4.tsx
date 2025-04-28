import { RadioQuestion } from "../components/RadioQuestion";
import { SurveyPageLayout } from "../components/ServerLayout";

export default function Page4({ submit, onBack }: { submit: () => void; onBack: () => void }) {
    return (
        <SurveyPageLayout
            title="MEDICAL HISTORY & CHRONIC CONDITIONS"
            pageNumber={4}
            totalPages={4}
            onSubmit={submit}
            onBack={onBack}
            isLastPage={true}
        >
            <RadioQuestion question="Have you ever been diagnosed with Asthma ?" name="HadAsthma" required={true} />
            <RadioQuestion question="Have you ever been diagnosed with Skin Cancer ?" name="HadSkinCancer" required={true} />
            <RadioQuestion question="Do you engage in regular physical activities ?" name="PhysicalActivities" required={true} />
            <RadioQuestion question="Have you ever been diagnosed with Kidney Disease ?" name="HadKidneyDisease" required={true} />
        </SurveyPageLayout>
    );
}
