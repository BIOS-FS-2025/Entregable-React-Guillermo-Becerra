import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardDetailSearcher from "./CardDetailSearcher";

const CardSearcherContainer = () => {
    const [allCards, setAllCards] = useState([]);
    const navigate = useNavigate();
    CardSearcherContainer
    useEffect(() => {
        const fetchAllCards = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_YUGIOH_API_URL}`);
                const data = await res.json();
                setAllCards(data.data.map(card => card.name));
            } catch (err) {
                console.error("Error al obtener las cartas:", err);
            }
        };
        fetchAllCards();
    }, []);

    return (
        <CardDetailSearcher allCards={allCards} navigate={navigate} />
    );
};

export default CardSearcherContainer;
