const SuggestionsList = ({ filtered, showSuggestions, handleSelect }) => {
    if (!showSuggestions || filtered.length === 0) return null;

    return (
        <ul className="absolute top-12 w-64 max-h-48 overflow-y-auto rounded-lg shadow-md z-10 bg-gray-700 border border-gray-600 text-white">
            {filtered.map((c, idx) => (
                <li
                    key={idx}
                    className="px-3 py-2 cursor-pointer capitalize hover:bg-gray-600"
                    onClick={() => handleSelect(c)}
                >
                    {c}
                </li>
            ))}
        </ul>
    );
};

export default SuggestionsList;
