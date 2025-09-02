import { useTheme } from "../context/ThemeContext";

function Pagination({ totalCards, cardsPerPage, currentPage, setCurrentPage }) {

    const {darkMode} = useTheme();

    const totalPages = Math.ceil(totalCards / cardsPerPage);

    return (
        <div className="flex justify-center mt-6 space-x-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-700 hover:bg-gray-600"} px-4 py-2 text-gray-300 rounded disabled:opacity-50 transition`}
            >
                Prev
            </button>

            <span className={`${darkMode ? "bg-gray-900" : "bg-gray-800"} px-4 py-2 text-gray-300 rounded`}>
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`${darkMode ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-700 hover:bg-gray-600"} px-4 py-2 text-gray-300 rounded disabled:opacity-50 transition`}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
