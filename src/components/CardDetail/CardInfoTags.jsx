import { FaBook, FaTags } from "react-icons/fa";
import { RiSwordFill, RiShieldFill } from "react-icons/ri";

import starIcon from "../../assets/level/level.webp";
import attributeIcons from "../../img/icons/attributeIcons";
import typingIcons from "../../img/icons/typingIcons";

const CardInfoTags = ({ card, darkMode }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {card.type && (
            <Tag darkMode={darkMode} label="Type">
                <FaBook className="h-5 w-5" /> {card.type}
            </Tag>
        )}
        {card.race && (
            <Tag darkMode={darkMode} label="Typing">
                <img src={typingIcons[card.race]} alt={card.race} className="w-5 h-5" /> {card.race}
            </Tag>
        )}
        {card.attribute && (
            <Tag darkMode={darkMode} label="Attribute">
                <img src={attributeIcons[card.attribute]} alt={card.attribute} className="w-5 h-5" /> {card.attribute}
            </Tag>
        )}
        {card.level && (
            <Tag darkMode={darkMode} label="Level">
                <img src={starIcon} alt="star" className="w-5 h-5" /> {card.level}
            </Tag>
        )}
        {card.rank && (
            <Tag darkMode={darkMode} label="Rank">
                <img src={starIcon} alt="star" className="w-5 h-5" /> {card.rank}
            </Tag>
        )}
        {card.atk !== undefined && (
            <Tag darkMode={darkMode} label="ATK">
                <RiSwordFill className="h-5 w-5" /> {card.atk === -1 ? "?" : card.atk}
            </Tag>
        )}
        {card.def !== undefined && (
            <Tag darkMode={darkMode} label="DEF">
                <RiShieldFill className="h-5 w-5" /> {card.def === -1 ? "?" : card.def}
            </Tag>
        )}
        {card.archetype && (
            <Tag darkMode={darkMode} label="Archetype">
                <FaTags className="h-5 w-5" /> {card.archetype}
            </Tag>
        )}
    </div>
);

const Tag = ({ darkMode, label, children }) => (
    <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg shadow`}>
        <span className="font-bold">{label}:</span>
        <div className="flex mt-1 gap-1 items-center whitespace-nowrap">{children}</div>
    </div>
);

export default CardInfoTags;
