import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { X } from "lucide-react";

const CardImageModal = ({ card, imageIndex, setImageIndex, setIsModalOpen, darkMode }) => {
    const hasMultipleImages = card.card_images.length > 1;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setIsModalOpen(false)} className="absolute -top-8 right-0 text-white text-2xl hover:text-blue-500">
                    <X className="w-7 h-7" />
                </button>
                <img src={card.card_images[imageIndex].image_url} alt={card.name} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg" />
                {hasMultipleImages && (
                    <div className="absolute inset-0 flex justify-between items-center px-4">
                        <button
                            onClick={() => setImageIndex((prev) => (prev === 0 ? card.card_images.length - 1 : prev - 1))}
                            className={`${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"} text-white p-3 rounded-full -translate-x-20`}
                        >
                            <FaChevronCircleLeft className="w-7 h-7" />
                        </button>
                        <button
                            onClick={() => setImageIndex((prev) => (prev === card.card_images.length - 1 ? 0 : prev + 1))}
                            className={`${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"} text-white p-3 rounded-full translate-x-20`}
                        >
                            <FaChevronCircleRight className="w-7 h-7" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardImageModal;
