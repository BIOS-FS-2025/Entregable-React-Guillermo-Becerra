import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, X } from "lucide-react";
import { FaBook, FaTags, FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { RiSwordFill, RiShieldFill } from "react-icons/ri";


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
    const [imageIndex, setImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [relatedCards, setRelatedCards] = useState([]);

    /* -------------------------------------------------------------------------- */
    /*                                    Fetch                                   */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        const fetchCard = async () => {
            try {

                const cleanName = name.replace(/#/g, "");

                const response = await fetch(
                    `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cleanName)}`
                );
                const data = await response.json();
                const currentCard = data.data[0];
                setCard(currentCard);
                setImageIndex(0);

                // Related Cards
                fetchRelated(currentCard);
            } catch (error) {
                console.error("Can't find card:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [name]);

    /* -------------------------------------------------------------------------- */
    /*                             Related Cards Fetch                            */
    /* -------------------------------------------------------------------------- */

    const fetchRelated = async (currentCard) => {
        let related = [];

        /* ------------ Group 1: Cards mentioned in the current card text ----------- */
        if (currentCard.desc) {
            const regex = /"([^"]+)"/g;
            let match;
            const mentionedNames = [];

            while ((match = regex.exec(currentCard.desc)) !== null) {
                const cardName = match[1].trim();
                if (
                    cardName &&
                    cardName.toLowerCase() !== currentCard.name.toLowerCase() &&
                    !mentionedNames.includes(cardName.toLowerCase())
                ) {
                    mentionedNames.push(cardName);
                }
            }

            // Cards Fetch
            const fetchPromises = mentionedNames.map((name) =>
                fetch(
                    `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(name)}`
                )
                    .then((res) => res.json())
                    .then((data) => (data.data ? data.data[0] : null))
                    .catch(() => null)
            );

            const results = await Promise.allSettled(fetchPromises);

            results.forEach((result) => {
                if (
                    result.status === "fulfilled" &&
                    result.value &&
                    !related.some((r) => r.id === result.value.id)
                ) {
                    related.push(result.value);
                }
            });
        }

        /* ------- Group 2: Cards that mention the current card in their text ------- */

        if (related.length < 7) {
            try {
                const res = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`);
                const data = await res.json();

                if (data.data) {
                    // Search current card name on other cards description
                    const mentionsCurrent = data.data.filter(
                        (c) =>
                            c.id !== currentCard.id &&
                            c.desc &&
                            c.desc.toLowerCase().includes(currentCard.name.toLowerCase()) &&
                            !related.some((r) => r.id === c.id)
                    );

                    // Random selection
                    const shuffled = mentionsCurrent.sort(() => 0.5 - Math.random());
                    related = [...related, ...shuffled.slice(0, 7 - related.length)];
                }
            } catch (err) {
                console.warn("Can't find cards that mentions the current card");
            }
        }

        /* --------------------------- Group 3: Archetype --------------------------- */
        if (related.length < 7 && currentCard.archetype) {
            try {
                const res = await fetch(
                    `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${encodeURIComponent(
                        currentCard.archetype
                    )}`
                );
                const data = await res.json();

                if (data.data) {
                    const filtered = data.data.filter(
                        (c) => c.id !== currentCard.id && !related.some((r) => r.id === c.id)
                    );

                    const shuffled = filtered.sort(() => 0.5 - Math.random());
                    related = [...related, ...shuffled.slice(0, 7 - related.length)];
                }
            } catch (err) {
                console.warn("Can't find cards with same Archetype or Archetype not found");
            }
        }

        setRelatedCards(related.slice(0, 7));
    };

    /* -------------------------------------------------------------------------- */
    /*                                   Return                                   */
    /* -------------------------------------------------------------------------- */

    /* --------------------------------- Loading -------------------------------- */

    if (loading) {
        return (
            <div className="mt-32 flex flex-col items-center justify-center py-6">
                {/* Spinner */}
                <div className="w-20 h-20 border-8 border-blue-500 border-dashed rounded-full animate-spin"></div>
                {/* Texto */}
                <p className={`${darkMode ? "text-gray-200" : "text-gray-400"} mt-3 text-center text-2xl font-medium`}>
                    Loading card...
                </p>
            </div>
        );
    }

    /* ---------------------------------- Error --------------------------------- */

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

    /* ------------------------------- Card Detail ------------------------------ */

    const hasMultipleImages = card.card_images.length > 1;

    return (
        <section
            className={`px-6 py-12 flex flex-col items-center 
        ${darkMode ? "text-gray-100" : "text-gray-900"}`}
        >
            {/* Search Btn */}
            <button
                onClick={() => navigate(-1)}
                className={`font-semibold mb-8 flex items-center gap-2 px-4 py-2 rounded-lg shadow 
            transition-all duration-300 
            ${darkMode ? "bg-gray-900 hover:bg-blue-800" : "bg-white hover:bg-blue-200"}`}
            >
                <ArrowLeft className="w-5 h-5" />
                Card Searcher
            </button>

            {/* Card */}
            <div
                className={`w-full max-w-7xl rounded-2xl shadow-lg overflow-hidden 
                flex flex-col md:flex-row gap-6 p-6 
                ${darkMode ? "bg-gray-900" : "bg-white"}`}
            >
                <div className="space-y-4">
                    <div className="flex-shrink-0 flex justify-center">
                        <img
                            src={card.card_images[imageIndex].image_url}
                            alt={card.name}
                            className="min-w-80 max-w-48 h-auto max-h-[600px] object-contain cursor-zoom-in z-50 hover:scale-105 transition"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>

                    {/* Alt img btns */}
                    {hasMultipleImages && (
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() =>
                                    setImageIndex((prev) =>
                                        prev === 0 ? card.card_images.length - 1 : prev - 1
                                    )
                                }
                                className={`${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-blue-500 hover:bg-blue-600 text-white"} px-4 py-2 rounded-lg shadow text-sm font-semibold disabled:opacity-50`}
                            >
                                Prev Illustration
                            </button>
                            <button
                                onClick={() =>
                                    setImageIndex((prev) =>
                                        prev === card.card_images.length - 1 ? 0 : prev + 1
                                    )
                                }
                                className={`${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-100" : "bg-blue-500 hover:bg-blue-600 text-white"} px-4 py-2 rounded-lg shadow text-sm font-semibold disabled:opacity-50`}
                            >
                                Next Illustration
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-start flex-grow space-y-6">

                    {/* ------------------------------ Card Name ------------------------------ */}
                    <h1 className="text-4xl font-bold text-blue-500">{card.name}</h1>

                    {/* ------------------------------ Info Tags ------------------------------ */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">

                        {card.type && (
                            <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
                                <span className="font-bold">Type:</span>
                                <div className="flex mt-1 gap-1 items-center whitespace-nowrap">
                                    <FaBook className="h-5 w-5" />
                                    {card.type}
                                </div>
                            </div>
                        )}

                        {card.race && (
                            <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
                                <span className="font-bold">Typing:</span>
                                <div className="flex mt-1 gap-1 items-center">
                                    <img src={typingIcons[card.race]} alt={card.race} className="w-5 h-5" />
                                    {card.race}
                                </div>
                            </div>
                        )}

                        {card.attribute && (
                            <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
                                <span className="font-bold">Attribute:</span>
                                <div className="flex mt-1 gap-1 items-center">
                                    <img src={attributeIcons[card.attribute]} alt={card.attribute} className="w-5 h-5" />
                                    {card.attribute}
                                </div>
                            </div>
                        )}

                        {card.level && (
                            <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
                                <span className="font-bold">Level:</span>
                                <div className="flex mt-1 gap-1 items-center">
                                    <img src={starIcon} alt="star icon" className="w-5 h-5" />
                                    {card.level}
                                </div>
                            </div>
                        )}

                        {card.rank && (
                            <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
                                <span className="font-bold">Rank:</span>
                                <div className="flex mt-1 gap-1 items-center">
                                    <img src={starIcon} alt="star icon" className="w-5 h-5" />
                                    {card.rank}
                                </div>
                            </div>
                        )}

                        {card.atk !== undefined && (
                            <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
                                <span className="font-bold">ATK:</span>
                                <div className="flex mt-1 gap-1 items-center whitespace-nowrap">
                                    <RiSwordFill className="h-5 w-5" />
                                    {card.atk}
                                </div>
                            </div>
                        )}

                        {card.def !== undefined && (
                            <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
                                <span className="font-bold">DEF:</span>
                                <div className="flex mt-1 gap-1 items-center whitespace-nowrap">
                                    <RiShieldFill className="h-5 w-5" />
                                    {card.def}
                                </div>
                            </div>
                        )}

                        {card.archetype && (
                            <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
                                <span className="font-bold">Archetype:</span>
                                <div className="flex mt-1 gap-1 items-center whitespace-nowrap">
                                    <FaTags className="h-5 w-5" />
                                    {card.archetype}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ------------------------------ Card Text ------------------------------ */}
                    <div>
                        <h2 className="text-2xl font-bold text-blue-500 mb-1">Card Text:</h2>
                        <p className={`${darkMode ? "text-gray-100" : "text-black"} text-base font-medium leading-relaxed max-h-32 overflow-y-auto pr-2 whitespace-pre-line`}>{card.desc}</p>
                    </div>
                </div>
            </div>

            {/* ------------------------------ Cartas relacionadas ------------------------------ */}
            {relatedCards.length > 0 && (
                <div className="w-full max-w-7xl mt-10">
                    <h2 className="text-2xl font-bold text-blue-500 mb-4">
                        Related Cards:
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {relatedCards.map((rc) => (
                            <div
                                key={rc.id}
                                className={`cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transition ${darkMode ? "bg-gray-800" : "bg-gray-100"
                                    }`}
                                onClick={() => navigate(`/card/${encodeURIComponent(rc.name)}`)}
                            >
                                <img
                                    src={rc.card_images[0].image_url_small}
                                    alt={rc.name}
                                    className="w-full h-auto"
                                />
                                <p className="text-center text-sm font-semibold px-1 py-2 truncate">
                                    {rc.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ------------------------------ Modal de imagen ------------------------------ */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-8 right-0 text-white text-2xl hover:text-blue-500"
                        >
                            <X className="w-7 h-7" />
                        </button>
                        <img
                            src={card.card_images[imageIndex].image_url}
                            alt={card.name}
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
                        />

                        {/* ---------- Modal Alt Img Btns ---------- */}
                        {hasMultipleImages && (
                            <div className="absolute inset-0 flex justify-between items-center px-4">
                                <button
                                    onClick={() =>
                                        setImageIndex((prev) =>
                                            prev === 0 ? card.card_images.length - 1 : prev - 1
                                        )
                                    }
                                    className={`${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"} text-white p-3 rounded-full -translate-x-20`}
                                >
                                    <FaChevronCircleLeft className="w-7 h-7" />
                                </button>
                                <button
                                    onClick={() =>
                                        setImageIndex((prev) =>
                                            prev === card.card_images.length - 1 ? 0 : prev + 1
                                        )
                                    }
                                    className={`${darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"} text-white p-3 rounded-full translate-x-20`}
                                >
                                    <FaChevronCircleRight className="w-7 h-7" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section >
    );
}

export default CardDetail;
