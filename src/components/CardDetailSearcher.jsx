import { useState } from "react";
import SuggestionsList from "./SuggestionsList";
import GoButton from "./GoButton";
import { useTheme } from "../context/ThemeContext";

const CardDetailSearcher = ({ allCards, navigate }) => {

    const {darkMode} = useTheme();

    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.length > 0) {
            const results = allCards.filter(c =>
                c.toLowerCase().includes(value.toLowerCase())
            );
            setFiltered(results.slice(0, 10));
            setShowSuggestions(true);
        } else {
            setFiltered([]);
            setShowSuggestions(false);
        }
    };

    const handleSelect = (name) => {
        setSearch(name);
        setShowSuggestions(false);
    };

    const isValidCard = allCards.some(c => c.toLowerCase() === search.toLowerCase());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidCard) {
            const cleanSearch = search.replace(/#/g, "");
            navigate(`/card/${cleanSearch}`);
        }
    };

    return (
        <div className="mt-24 flex items-center justify-center">
            <div className={`${darkMode ? "bg-gray-900" : "bg-gray-600"} text-white shadow-2xl rounded-xl p-16 w-full max-w-2xl text-center`}>
                <h1 className="text-3xl font-bold mb-4 tracking-wide">SELECT A CARD</h1>
                <p className="text-gray-300 mb-6 italic">
                    Type the name of a card and press the button to see its details.
                </p>

                <form onSubmit={handleSubmit} className="relative flex justify-center gap-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleChange}
                        placeholder="Type a card name..."
                        className={`${darkMode ? "bg-gray-700 focus:ring-blue-500" : "bg-gray-800 focus:ring-blue-200"} text-white placeholder-gray-400 border-gray-600 focus:ring-2 shadow-lg px-3 py-2 rounded-md focus:outline-none w-96`}
                        onFocus={() => { if (filtered.length > 0) setShowSuggestions(true); }}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />

                    <SuggestionsList
                        filtered={filtered}
                        showSuggestions={showSuggestions}
                        handleSelect={handleSelect}
                    />

                    <GoButton
                        isValidCard={isValidCard}
                        handleSubmit={handleSubmit}
                    />
                </form>
            </div>
        </div>
    );
};

export default CardDetailSearcher;
