const GoButton = ({ isValidCard, handleSubmit }) => (

    <div className="relative group">
        <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isValidCard}
            className={`font-semibold px-5 py-2 rounded-lg shadow-lg transition-colors 
                ${isValidCard
                    ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
        >
            See Details
        </button>

        {!isValidCard && (
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-4 py-4 text-md text-white bg-blue-600 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                There is no card with that name.
            </span>
        )}
    </div>
);

export default GoButton;
