import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft } from "lucide-react";

function CardDetail() {
    const { name } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch(
                    `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`
                );
                const data = await response.json();
                setCard(data.data[0]);
            } catch (error) {
                console.error("Error al traer la carta:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [name]);

    if (loading) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-100 text-gray-800"
                    }`}
            >
                <p>Loading card...</p>
            </div>
        );
    }

    if (!card) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-100 text-gray-800"
                    }`}
            >
                <p>Cannot find card</p>
            </div>
        );
    }

    return (
        <section
            className={`px-6 py-12 flex flex-col items-center 
        ${darkMode ? "text-gray-100" : "text-gray-900"}`}
        >
            {/* Botón volver */}
            <button
                onClick={() => navigate(-1)}
                className={`font-semibold mb-8 flex items-center gap-2 px-4 py-2 rounded-lg shadow 
            transition-all duration-300 
            ${darkMode ? "bg-gray-900 hover:bg-blue-800" : "bg-white hover:bg-blue-200"}`}
            >
                <ArrowLeft className="w-5 h-5" />
                Back
            </button>

            {/* Card */}
            <div
                className={`w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden 
                flex flex-col md:flex-row gap-6 p-6 
                ${darkMode ? "bg-gray-900" : "bg-white"}`}
            >
                <div className="flex-shrink-0 flex justify-center">
                    <img
                        src={card.card_images[0].image_url}
                        alt={card.name}
                        className="w-80 h-auto max-h-[600px] object-contain cursor-zoom-in z-50 hover:scale-105 transition"
                    />
                </div>

                <div className="flex flex-col justify-start flex-grow space-y-6">
                    <h1 className="text-4xl font-bold text-blue-500">{card.name}</h1>

                    {/* Info en tarjetas */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">

                        {card.type && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Type:</span> <br /> {card.type}
                            </div>
                        )}
                        {card.race && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Race:</span> <br /> {card.race}
                            </div>
                        )}
                        {card.attribute && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Attribute:</span> <br /> {card.attribute}
                            </div>
                        )}
                        {card.level && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Level:</span> <br /> {card.level}
                            </div>
                        )}
                        {card.rank && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Rank:</span> <br /> {card.rank}
                            </div>
                        )}
                        {card.atk !== undefined && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">ATK:</span> <br /> {card.atk}
                            </div>
                        )}
                        {card.def !== undefined && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">DEF:</span> <br /> {card.def}
                            </div>
                        )}
                        {card.archetype && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Archetype:</span> <br /> {card.archetype}
                            </div>
                        )}
                    </div>
                    <div>
                    <h2 className="text-2xl font-bold text-blue-500 mb-1">Card Text:</h2>
                    <p className="text-base font-medium leading-relaxed max-h-32 overflow-y-auto pr-2 whitespace-pre-line">{card.desc}</p>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default CardDetail;
