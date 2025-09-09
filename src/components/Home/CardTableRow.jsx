import { useState } from "react";
import CardModal from "./CardModal";
import { useTheme } from "../../context/ThemeContext";

import darkIcon from "../../assets/attributes/DARK.jpg";
import lightIcon from "../../assets/attributes/LIGHT.jpg";
import windIcon from "../../assets/attributes/WIND.jpg";
import fireIcon from "../../assets/attributes/FIRE.jpg";
import earthIcon from "../../assets/attributes/EARTH.jpg";
import waterIcon from "../../assets/attributes/WATER.jpg";
import divineIcon from "../../assets/attributes/DIVINE.jpg";

import starIcon from "../../assets/level/level.webp";

import AquaIcon from "../../assets/typing/Aqua.png";
import BeastWarriorIcon from "../../assets/typing/Beast-Warrior.png";
import BeastIcon from "../../assets/typing/Beast.png";
import ContinuousIcon from "../../assets/typing/Continuous.png";
import CounterIcon from "../../assets/typing/Counter.png";
import CreatorGodIcon from "../../assets/typing/Creator-God.png";
import CyberseIcon from "../../assets/typing/Cyberse.png";
import DinosaurIcon from "../../assets/typing/Dinosaur.png";
import DivineBeastIcon from "../../assets/typing/Divine-Beast.png";
import DragonIcon from "../../assets/typing/Dragon.png";
import EquipIcon from "../../assets/typing/Equip.png";
import FairyIcon from "../../assets/typing/Fairy.png";
import FieldIcon from "../../assets/typing/Field.png";
import FiendIcon from "../../assets/typing/Fiend.png";
import FishIcon from "../../assets/typing/Fish.png";
import IllusionIcon from "../../assets/typing/Illusion.png";
import InsectIcon from "../../assets/typing/Insect.png";
import MachineIcon from "../../assets/typing/Machine.png";
import NormalIcon from "../../assets/typing/Normal.png";
import PlantIcon from "../../assets/typing/Plant.png";
import PsychicIcon from "../../assets/typing/Psychic.png";
import PyroIcon from "../../assets/typing/Pyro.png";
import QuickPlayIcon from "../../assets/typing/Quick-Play.png";
import ReptileIcon from "../../assets/typing/Reptile.png";
import RitualIcon from "../../assets/typing/Ritual.png";
import RockIcon from "../../assets/typing/Rock.png";
import SeaSerpentIcon from "../../assets/typing/Sea Serpent.png";
import SpellcasterIcon from "../../assets/typing/Spellcaster.png";
import ThunderIcon from "../../assets/typing/Thunder.png";
import WarriorIcon from "../../assets/typing/Warrior.png";
import WingedBeastIcon from "../../assets/typing/Winged Beast.png";
import WyrmIcon from "../../assets/typing/Wyrm.png";
import ZombieIcon from "../../assets/typing/Zombie.png";

const attributeIcons = {
    DARK: darkIcon,
    LIGHT: lightIcon,
    WIND: windIcon,
    FIRE: fireIcon,
    EARTH: earthIcon,
    WATER: waterIcon,
    DIVINE: divineIcon,
};

const typingIcons = {
    "Aqua": AquaIcon,
    "Beast-Warrior": BeastWarriorIcon,
    "Beast": BeastIcon,
    "Continuous": ContinuousIcon,
    "Counter": CounterIcon,
    "Creator-God": CreatorGodIcon,
    "Cyberse": CyberseIcon,
    "Dinosaur": DinosaurIcon,
    "Divine-Beast": DivineBeastIcon,
    "Dragon": DragonIcon,
    "Equip": EquipIcon,
    "Fairy": FairyIcon,
    "Field": FieldIcon,
    "Fiend": FiendIcon,
    "Fish": FishIcon,
    "Illusion": IllusionIcon,
    "Insect": InsectIcon,
    "Machine": MachineIcon,
    "Normal": NormalIcon,
    "Plant": PlantIcon,
    "Psychic": PsychicIcon,
    "Pyro": PyroIcon,
    "Quick-Play": QuickPlayIcon,
    "Reptile": ReptileIcon,
    "Ritual": RitualIcon,
    "Rock": RockIcon,
    "Sea Serpent": SeaSerpentIcon,
    "Spellcaster": SpellcasterIcon,
    "Thunder": ThunderIcon,
    "Warrior": WarriorIcon,
    "Winged Beast": WingedBeastIcon,
    "Wyrm": WyrmIcon,
    "Zombie": ZombieIcon,
};

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
