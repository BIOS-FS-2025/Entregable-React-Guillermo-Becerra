const CardImage = ({ card, imageIndex, setImageIndex, setIsModalOpen, darkMode }) => {
    const hasMultipleImages = card.card_images.length > 1;

    return (
        <div className="space-y-4">
            <div className="flex-shrink-0 flex justify-center">
                <img
                    src={card.card_images[imageIndex].image_url}
                    alt={card.name}
                    className="min-w-80 max-w-48 h-auto max-h-[600px] object-contain cursor-zoom-in hover:scale-105 transition rounded-xl"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            {hasMultipleImages && (
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() =>
                            setImageIndex((prev) =>
                                prev === 0 ? card.card_images.length - 1 : prev - 1
                            )
                        }
                        className={`${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-blue-500 hover:bg-blue-600 text-white"} px-4 py-2 rounded-lg shadow text-sm font-semibold`}
                    >
                        Prev Illustration
                    </button>
                    <button
                        onClick={() =>
                            setImageIndex((prev) =>
                                prev === card.card_images.length - 1 ? 0 : prev + 1
                            )
                        }
                        className={`${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-blue-500 hover:bg-blue-600 text-white"} px-4 py-2 rounded-lg shadow text-sm font-semibold`}
                    >
                        Next Illustration
                    </button>
                </div>
            )}
        </div>
    );
};

export default CardImage;
