import { SurveyPageLayout } from "../components/ServerLayout";

export default function Page2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    return (
        <SurveyPageLayout title="SUBSTANCE USE & METABOLIC HEALTH" pageNumber={2} totalPages={4} onNext={onNext} onBack={onBack}>
            <div className="mb-4">
                <label htmlFor="SmokerStatus" className="block text-gray-700 text-sm mb-2">Do you smoke?</label>
                <select id="SmokerStatus" name="SmokerStatus" className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline">
                    <option value="">Select your smoking habit</option>
                    <option value="1">Smoke daily</option>
                    <option value="2">Smoke occasionally</option>
                    <option value="3">Used to smoke</option>
                    <option value="4">Never smoked</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="AlcoholDrinkers" className="block text-gray-700 text-sm mb-2">Do you consume alcohol?</label>
                <select id="AlcoholDrinkers" name="AlcoholDrinkers" className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline">
                    <option value="">Select an option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    <option value="2">Occasionally</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="HadDiabetes" className="block text-gray-700 text-sm mb-2">Have you ever been diagnosed with Diabetes?</label>
                <select id="HadDiabetes" name="HadDiabetes" className="appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 border-gray-200 text-sm focus:outline">
                    <option value="">Select an option</option>
                    <option value="1">Yes</option>
                    <option value="2">Yes but only during pregnancy</option>
                    <option value="3">No</option>
                    <option value="4">No but pre-diabetes</option>
                </select>
            </div>
        </SurveyPageLayout>
    );
}
