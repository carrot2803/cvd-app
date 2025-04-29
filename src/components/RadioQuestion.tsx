import { YesNoRadioOption } from "./YesNoRadio";

interface RadioQuestionProps {
	question: string;
	name: string;
	defaultValue: string;
	onChange?: (name: string, value: string) => void;
}

export function RadioQuestion({
	question,
	name,
	defaultValue,
	onChange,
}: RadioQuestionProps) {
	return (
		<div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between sm:space-x-3">
			<label className="block text-gray-700 text-sm mb-2 sm:mb-0 w-full text-left sm:w-4/5">
				{question}
			</label>
			<YesNoRadioOption
				name={name}
				value={defaultValue}
				onChange={onChange}
			/>
		</div>
	);
}
