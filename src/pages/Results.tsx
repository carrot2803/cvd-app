import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

const KEY = import.meta.env.VITE_API_KEY;
const ai = new GoogleGenAI({ apiKey: KEY });

interface ResultsProps {
	probability: string | null;
	onTakeAnotherSurvey: () => void;
	topFeatures?: Array<[string, number]> | null;
}

export default function Results({
	probability,
	onTakeAnotherSurvey,
	topFeatures: initialTopFeatures,
}: ResultsProps) {
	const [recommendations, setRecommendations] = useState<string | null>(null);
	const [displayedRecommendations, setDisplayedRecommendations] =
		useState<string>("");
	const [isLoadingRecommendations, setIsLoadingRecommendations] =
		useState(false);
	const [showRecommendations, setShowRecommendations] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const fullRecommendationsRef = useRef<string | null>(null);

	const displayPercentage = probability
		? `${(parseFloat(probability) * 100).toFixed(1)}%`
		: "--%";

	useEffect(() => {
		if (!initialTopFeatures || initialTopFeatures.length === 0) return;

		const generateRecommendations = async () => {
			setIsLoadingRecommendations(true);
			try {
				await getRecommendations(initialTopFeatures);
			} finally {
				setIsLoadingRecommendations(false);
			}
		};

		generateRecommendations();
	}, [initialTopFeatures, probability]);

	async function getRecommendations(features: Array<[string, number]>) {
		if (!probability) return;

		try {
			const featureDescriptions = features
				.map((feature) => {
					const readableName = getReadableFeatureName(feature[0]);
					return `- ${readableName} (Impact: ${feature[1].toFixed(
						2
					)})`;
				})
				.join("\n");

			const riskPercentage = (parseFloat(probability) * 100).toFixed(1);

			const prompt = `
            I have a ${riskPercentage}% chance of developing cardiovascular disease based on a health assessment.
            
            My top risk factors that contribute to this probability are:
            ${featureDescriptions}
            
            Do not respond in a replying fashion, answer the question like I did not ask first.
            No rich text.
            Please provide specific, actionable recommendations to reduce my cardiovascular disease risk based on these factors.
            If the risk percentage is under 20% ensure the response is framed in way that expresses that these  recommendations are to eep the percentage low.
            IGNORE factors that cannot be changed such as impairments, age, height, mobility, vaccination and gender.
            Make it concise and very short, around 3-4 lines.
            Focus on evidence-based lifestyle changes and preventive measures.
            `;

			const response = await ai.models.generateContent({
				model: "gemini-2.0-flash",
				contents: prompt,
			});

			const responseText = response.text ?? null;
			setRecommendations(responseText);
			fullRecommendationsRef.current = responseText;
		} catch (error) {
			console.error("Error getting recommendations:", error);
		}
	}

	const getReadableFeatureName = (featureName: string): string => {
		const nameMap: Record<string, string> = {
			Sex: "Gender",
			AgeCategory: "Age",
			BMI: "Body Mass Index",
			SmokerStatus: "Smoking Status",
			HadDiabetes: "Diabetes",
			PhysicalActivities: "Physical Inactivity",
			HadArthritis: "Arthritis",
			HaveHighCholesterol: "High Cholesterol",
			WeightInKilograms: "Weight",
			HadKidneyDisease: "Kidney Disease",
			AlcoholDrinkers: "Alcohol Consumption",
			Mobility: "Limited Mobility",
			HadAsthma: "Asthma",
			GeneralHealth: "Poor General Health",
			HadSkinCancer: "Skin Cancer",
		};

		return nameMap[featureName] || featureName;
	};

	// Typewriter effect for recommendations
	useEffect(() => {
		// Only start typing when user explicitly shows recommendations and we have content
		if (showRecommendations && recommendations) {
			// Reset state
			setIsTyping(true);
			setDisplayedRecommendations("");

			const fullText = recommendations; // Use recommendations directly as fallback
			let currentIndex = 0;

			const typingInterval = setInterval(() => {
				if (currentIndex < fullText.length) {
					setDisplayedRecommendations(
						fullText.substring(0, currentIndex + 1)
					);
					currentIndex++;
				} else {
					clearInterval(typingInterval);
					setIsTyping(false);
				}
			}, 20); // Adjust typing speed here (lower = faster)

			return () => {
				clearInterval(typingInterval);
				// Make sure typing state is reset when component updates
				if (!showRecommendations) {
					setIsTyping(false);
				}
			};
		}
	}, [showRecommendations, recommendations]);

	const toggleRecommendations = () => {
		// If we need to fetch recommendations
		if (
			!recommendations &&
			!isLoadingRecommendations &&
			initialTopFeatures
		) {
			getRecommendations(initialTopFeatures);
		}

		// Always reset displayed text when toggling
		setDisplayedRecommendations("");
		setShowRecommendations(!showRecommendations);
	};

	const RecommendationsSkeleton = () => (
		<div className="mt-2">
			<div className="bg-blue-50 p-4 rounded-lg animate-pulse">
				<div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
				<div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
				<div className="h-4 bg-gray-200 rounded w-4/5"></div>
			</div>
		</div>
	);

	return (
		<div className="bg-gray-50 flex items-center justify-center min-h-screen font-sans">
			<div className="w-full max-w-xl bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 my-4 mx-4">
				<h1 className="text-3xl font-bold mb-3 text-center text-blue-600">
					Heart Health Assessment
				</h1>

				<div className="text-center">
					<p className="text-gray-700 mb-5 text-lg">
						Your heart disease probability is:
					</p>
					<div
						className="inline-block bg-blue-100 rounded-full px-8 py-4 cursor-pointer hover:bg-blue-200 transition-colors duration-300"
						onClick={toggleRecommendations}
						title="Click for recommendations"
					>
						<span className="text-5xl font-bold text-blue-600">
							{displayPercentage}
						</span>
						<div className="mt-1 text-sm text-blue-600">
							{showRecommendations
								? "Hide recommendations"
								: "Click for recommendations"}
						</div>
					</div>

					<div
						className={`mt-6 overflow-hidden transition-all duration-500 ease-in-out ${
							showRecommendations
								? "max-h-96 opacity-100 mb-7"
								: "max-h-0 opacity-0"
						}`}
					>
						{isLoadingRecommendations ? (
							<RecommendationsSkeleton />
						) : recommendations ? (
							<div className="transform transition-transform duration-500 ease-in-out">
								<div className="bg-blue-50 p-4 rounded-lg text-gray-700 leading-relaxed text-left">
									{displayedRecommendations}
									{isTyping && (
										<span className="inline-block w-1 h-4 ml-1 bg-blue-600 animate-pulse"></span>
									)}
								</div>
							</div>
						) : null}
					</div>
				</div>

				<div className="text-center pb-2 mt-6">
					<button
						onClick={onTakeAnotherSurvey}
						className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
					>
						Take Another Assessment
					</button>
				</div>
			</div>
		</div>
	);
}
