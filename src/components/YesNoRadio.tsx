// Reusable Yes/No Radio Option component
export function YesNoRadioOption({ name, required = false }: { name: string; required?: boolean }) {
    return (
        <div className="flex gap-4 sm:w-1/5">
            <label className="flex-1">
                <input type="radio" name={name} value="Yes" required={required} className="hidden peer" />
                <div className="w-full py-1 text-gray-700 px-3 border-2 border-gray-200 text-sm rounded-md text-center font-medium cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600">
                    Yes
                </div>
            </label>
            <label className="flex-1">
                <input type="radio" name={name} value="No" className="hidden peer" />
                <div className="w-full py-1 text-gray-700 px-3 border-2 border-gray-200 text-sm rounded-md text-center font-medium cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600">
                    No
                </div>
            </label>
        </div>
    );
}