const CardText = ({ card, darkMode }) => (
    <div>
        <h2 className="text-2xl font-bold text-blue-500 mb-1">Card Text:</h2>
        <p className={`${darkMode ? "text-gray-100" : "text-black"} text-base font-medium leading-relaxed max-h-32 overflow-y-auto pr-2 whitespace-pre-line`}>
            {card.desc}
        </p>
    </div>
);

export default CardText;
