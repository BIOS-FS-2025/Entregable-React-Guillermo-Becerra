import { useState } from "react";
import CardModal from "./CardModal";
import { useTheme } from "../../context/ThemeContext";

import attributeIcons from "../../img/icons/attributeIcons";
import typingIcons from "../../img/icons/typingIcons";
import starIcon from "../../assets/level/level.webp";

const typeColors = {
    "Spell Card": "text-green-400",
    "Trap Card": "text-pink-400",
    "Normal Monster": "text-yellow-400",
    "Toon Monster": "text-orange-400",
    "Normal Tuner Monster": "text-yellow-400",
    "Tuner Monster": "text-orange-400",
    "Effect Monster": "text-orange-400",
    "Spirit Monster": "text-orange-400",
    "Gemini Monster": "text-orange-400",
    "Union Effect Monster": "text-orange-400",
    "Flip Effect Monster": "text-orange-400",
    "Pendulum Effect Monster": "text-orange-400",
    "Pendulum Normal Monster": "text-yellow-400",
    "Pendulum Effect Fusion Monster": "text-purple-400",
    "Fusion Monster": "text-purple-400",
    "Ritual Effect Monster": "text-blue-400",
    "Ritual Monster": "text-blue-400",
    "Synchro Monster": "text-gray-200",
    "Synchro Tuner Monster": "text-gray-200",
    "XYZ Monster": "text-zinc-400",
    "Link Monster": "text-sky-400",
    "Skill Card": "text-gray-600",
    "Token": "text-gray-600",
};


function CardTableRow({ card }) {

    const { darkMode } = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const atkValue = card.atk === -1 ? "?" : card.atk ?? "-";
    const defValue = card.def === -1 ? "?" : card.def ?? "-";

    return (
        <>
            <tr className={`${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-700"} border-b border-gray-700 transition-colors divide-x divide-gray-700 cursor-pointer`}
                onClick={() => setIsModalOpen(true)}
            >
                {/* Level/Rank */}
                <td className="px-4 py-2 flex items-center space-x-2">
                    {(card.level || card.rank || card.linkval) && (
                        <img src={starIcon} alt="Level Icon" className="w-5 h-5" />
                    )}
                    <span>{card.level || card.rank || card.linkval || "-"}</span>
                </td>

                {/* Name */}
                <td className="px-4 py-2 font-semibold text-white">{card.name}</td>

                {/* Type */}
                <td className={`px-4 py-2 ${typeColors[card.type] || "text-gray-300"}`}>
                    {card.type || "-"}
                </td>

                {/* Typing */}
                <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                        {card.race && typingIcons[card.race] && (
                            <img
                                src={typingIcons[card.race]}
                                alt={card.race}
                                className="w-5 h-5"
                            />
                        )}
                        <span>{card.race || "-"}</span>
                    </div>
                </td>

                {/* Attribute */}
                <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                        {card.attribute && attributeIcons[card.attribute] && (
                            <img
                                src={attributeIcons[card.attribute]}
                                alt={card.attribute}
                                className="w-5 h-5"
                            />
                        )}
                        <span>{card.attribute || "-"}</span>
                    </div>
                </td>

                {/* ATK */}
                <td className="px-4 py-2">{atkValue}</td>

                {/* DEF */}
                <td className="px-4 py-2">{defValue}</td>

                {/* Archetype */}
                <td className="px-4 py-2">{card.archetype || "-"}</td>
            </tr>

            {/* Modal */}
            <CardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                card={card}
            />
        </>
    );
}

export default CardTableRow;
