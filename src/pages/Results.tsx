interface ResultsProps {
    probability: string | null;
    onTakeAnotherSurvey: () => void;
}

export default function Results({ probability, onTakeAnotherSurvey }: ResultsProps) {
    const displayPercentage = probability ?
        `${(parseFloat(probability) * 100).toFixed(1)}%` :
        '--%';

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-[Poppins]">
            <div className="w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 mx-4">
                <h1 className="text-2xl font-bold mb-4 text-center">Survey Results</h1>
                <p className="text-gray-700 text-lg text-center mb-4">Your heart disease probability is:</p>
                <div className="text-center">
                    <span id="resultDisplay" className="text-4xl font-bold text-blue-600">
                        {displayPercentage}
                    </span>
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={onTakeAnotherSurvey}
                        className="text-blue-500 hover:underline"
                    >
                        Take another survey
                    </button>
                </div>

            </div>
        </div>
    );
}