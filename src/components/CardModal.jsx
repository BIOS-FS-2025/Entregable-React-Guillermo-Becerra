import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CardModal = ({ isOpen, onClose, card }) => {
    if (!card) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-gray-900 rounded-2xl shadow-lg p-6 max-w-lg w-full relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
                        >
                            ✕
                        </button>

                        {/* Imagen */}
                        <div className="flex justify-center">
                            <img
                                src={card.card_images?.[0]?.image_url}
                                alt={card.name}
                                className="rounded-lg shadow-lg max-h-[600px]"
                            />
                        </div>

                        {/* Botón de más info */}
                        <div className="mt-6 flex justify-center">
                            <Link
                                to={`/card/${card.name}`}
                                className="w-2/3 text-center px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition"
                            >
                                Detailed info
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CardModal;
