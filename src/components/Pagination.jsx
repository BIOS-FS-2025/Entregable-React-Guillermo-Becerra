function Pagination({ totalCards, cardsPerPage, currentPage, setCurrentPage }) {
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    return (
        <div className="flex justify-center mt-6 space-x-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded disabled:opacity-50 hover:bg-gray-600 transition"
            >
                Prev
            </button>

            <span className="px-4 py-2 bg-gray-800 text-gray-300 rounded">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded disabled:opacity-50 hover:bg-gray-600 transition"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
