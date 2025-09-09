import { useTheme } from "../../context/ThemeContext";

function SearchBar({ searchTerm, setSearchTerm }) {

    const { darkMode } = useTheme();

    return (
        <div className="mb-4 flex justify-center">
            <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${darkMode ? "bg-gray-900" : "bg-gray-700"} w-2/3 px-4 py-2 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
        </div>
    );
}

export default SearchBar;
