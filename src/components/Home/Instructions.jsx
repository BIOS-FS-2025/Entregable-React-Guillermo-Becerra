import { Info } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Instructions = () => {

    const { darkMode } = useTheme();

    return (
        <div
            className={`${darkMode ? "bg-blue-300 border border-blue-400" : "bg-blue-100 border border-blue-300"} w-2/3 mx-auto mt-6 p-4 rounded-lg shadow-lg sm:w-2/3 lg:w-1/3`}
        >
            <div className={`${darkMode ? "text-gray-800" : "text-blue-800"} text-base flex-col space-y-3 text-center`}>
                <span className="flex gap-2 justify-center">
                    <Info className={`${darkMode ? "text-gray-800" : "text-blue-900"} w-6 h-6 mt-0.5`} />
                    <p className="text-lg">
                        <strong>Instructions:</strong>
                    </p>
                </span>
                <p className="italic">This is a list of all cards on our database.</p>
                <p className="font-semibold">Type in the search bar to find a card by name.</p>
                <p className="font-semibold">Filter cards by different characteristics using the drop-down menus.</p>
                <p className="font-semibold">Sort cards by Level/Rank, Name, ATK or DEF by clicking on the table headers.<br />Click again to reverse the order.</p>
                <p className="font-semibold">Click on a card row to see more details about that card.</p>
            </div>
        </div>
    );
};

export default Instructions;