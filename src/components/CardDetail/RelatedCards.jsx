const RelatedCards = ({ relatedCards, darkMode, navigate }) => (
    <div className="w-full max-w-7xl mt-10">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Related Cards:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {relatedCards.map((rc) => (
                <div
                    key={rc.id}
                    className={`cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transition ${darkMode ? "bg-gray-900" : "bg-white"}`}
                    onClick={() => navigate(`/card/${encodeURIComponent(rc.name.replace(/#/g, ""))}`)}
                >
                    <img src={rc.card_images[0].image_url_small} alt={rc.name} className="w-full h-auto" />
                    <p className="text-center text-sm font-semibold px-1 py-2 truncate">{rc.name}</p>
                </div>
            ))}
        </div>
    </div>
);

export default RelatedCards;
