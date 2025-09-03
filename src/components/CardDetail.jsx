import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, Sword, Shield, Notebook, Hash } from "lucide-react";

import darkIcon from "../assets/attributes/DARK.jpg";
import lightIcon from "../assets/attributes/LIGHT.jpg";
import windIcon from "../assets/attributes/WIND.jpg";
import fireIcon from "../assets/attributes/FIRE.jpg";
import earthIcon from "../assets/attributes/EARTH.jpg";
import waterIcon from "../assets/attributes/WATER.jpg";
import divineIcon from "../assets/attributes/DIVINE.jpg";

import starIcon from "../assets/level/level.webp";

import AquaIcon from "../assets/typing/Aqua.png";
import BeastWarriorIcon from "../assets/typing/Beast-Warrior.png";
import BeastIcon from "../assets/typing/Beast.png";
import ContinuousIcon from "../assets/typing/Continuous.png";
import CounterIcon from "../assets/typing/Counter.png";
import CreatorGodIcon from "../assets/typing/Creator-God.png";
import CyberseIcon from "../assets/typing/Cyberse.png";
import DinosaurIcon from "../assets/typing/Dinosaur.png";
import DivineBeastIcon from "../assets/typing/Divine-Beast.png";
import DragonIcon from "../assets/typing/Dragon.png";
import EquipIcon from "../assets/typing/Equip.png";
import FairyIcon from "../assets/typing/Fairy.png";
import FieldIcon from "../assets/typing/Field.png";
import FiendIcon from "../assets/typing/Fiend.png";
import FishIcon from "../assets/typing/Fish.png";
import IllusionIcon from "../assets/typing/Illusion.png";
import InsectIcon from "../assets/typing/Insect.png";
import MachineIcon from "../assets/typing/Machine.png";
import NormalIcon from "../assets/typing/Normal.png";
import PlantIcon from "../assets/typing/Plant.png";
import PsychicIcon from "../assets/typing/Psychic.png";
import PyroIcon from "../assets/typing/Pyro.png";
import QuickPlayIcon from "../assets/typing/Quick-Play.png";
import ReptileIcon from "../assets/typing/Reptile.png";
import RitualIcon from "../assets/typing/Ritual.png";
import RockIcon from "../assets/typing/Rock.png";
import SeaSerpentIcon from "../assets/typing/Sea Serpent.png";
import SpellcasterIcon from "../assets/typing/Spellcaster.png";
import ThunderIcon from "../assets/typing/Thunder.png";
import WarriorIcon from "../assets/typing/Warrior.png";
import WingedBeastIcon from "../assets/typing/Winged Beast.png";
import WyrmIcon from "../assets/typing/Wyrm.png";
import ZombieIcon from "../assets/typing/Zombie.png";

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
                                <span className="font-bold">Type:</span>
                                <div className="flex mt-1 gap-1 items-center whitespace-nowrap">
                                    <Notebook strokeWidth={2.5} className="h-5 w-5" />
                                    {card.type}
                                </div>
                            </div>
                        )}
                        {card.race && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Typing:</span>
                                <div className="flex mt-1 gap-1 items-center">
                                    <img src={typingIcons[card.race]} alt={card.race} className="w-5 h-5" />
                                    {card.race}
                                </div>
                            </div>
                        )}
                        {card.attribute && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Attribute:</span>
                                <div className="flex mt-1 gap-1 items-center">
                                    <img src={attributeIcons[card.attribute]} alt={card.attribute} className="w-5 h-5" />
                                    {card.attribute}
                                </div>
                            </div>
                        )}
                        {card.level && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Level:</span>
                                <div className="flex mt-1 gap-1 items-center">
                                    <img src={starIcon} alt="star icon" className="w-5 h-5" />
                                    {card.level}
                                </div>
                            </div>
                        )}
                        {card.rank && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Rank:</span>
                                <div className="flex mt-1 gap-1 items-center">
                                    <img src={starIcon} alt="star icon" className="w-5 h-5" />
                                    {card.rank}
                                </div>
                            </div>
                        )}
                        {card.atk !== undefined && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">ATK:</span>
                                <div className="flex mt-1 gap-1 items-center whitespace-nowrap">
                                    <Sword strokeWidth={2.5} className="h-5 w-5" />
                                    {card.atk}
                                </div>
                            </div>
                        )}
                        {card.def !== undefined && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">DEF:</span>
                                <div className="flex mt-1 gap-1 items-center whitespace-nowrap">
                                    <Shield strokeWidth={2.5} className="h-5 w-5" />
                                    {card.def}
                                </div>
                            </div>
                        )}
                        {card.archetype && (
                            <div className="px-4 py-2 rounded-lg shadow bg-blue-500 text-white">
                                <span className="font-bold">Archetype:</span>
                                <div className="flex mt-1 gap-1 items-center whitespace-nowrap">
                                    <Hash strokeWidth={2.5} className="h-5 w-5" />
                                    {card.archetype}
                                </div>
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
