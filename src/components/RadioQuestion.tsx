import { RadioQuestionProps } from "../utils";
import { YesNoRadioOption } from "./YesNoRadio";

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
