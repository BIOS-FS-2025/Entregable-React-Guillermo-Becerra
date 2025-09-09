import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { ArrowLeft } from "lucide-react";

import CardImage from "./CardImg";
import CardInfoTags from "./CardInfoTags";
import CardText from "./CardText";
import RelatedCards from "./RelatedCards";
import CardImageModal from "./CardImgModal";

function CardDetail() {
    const { name } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageIndex, setImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [relatedCards, setRelatedCards] = useState([]);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const cleanName = name.replace(/#/g, "");
                const response = await fetch(
                    `${import.meta.env.VITE_YUGIOH_API_URL}?name=${encodeURIComponent(cleanName)}`
                );
                const data = await response.json();
                const currentCard = data.data[0];
                setCard(currentCard);
                setImageIndex(0);
                fetchRelated(currentCard);
            } catch {
                setCard(null);
            } finally {
                setLoading(false);
            }
        };
        fetchCard();
    }, [name]);

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
                    `${import.meta.env.VITE_YUGIOH_API_URL}?name=${encodeURIComponent(name)}`
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
                const res = await fetch(`${import.meta.env.VITE_YUGIOH_API_URL}`);
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
                    `${import.meta.env.VITE_YUGIOH_API_URL}?archetype=${encodeURIComponent(
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

    return (
        <section className={`px-6 py-12 flex flex-col items-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            <button onClick={() => navigate(`/card`)} className={`font-semibold mb-8 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300
            ${darkMode ? "bg-gray-900 hover:bg-blue-800" : "bg-white hover:bg-blue-200"}`}>
                <ArrowLeft className="w-5 h-5" /> Card Searcher
            </button>
            <div className={`w-full max-w-7xl rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6 p-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
                <CardImage card={card} imageIndex={imageIndex} setImageIndex={setImageIndex} setIsModalOpen={setIsModalOpen} darkMode={darkMode} />
                <div className="flex flex-col flex-grow space-y-6">
                    <h1 className="text-4xl font-bold text-blue-500">{card.name}</h1>
                    <CardInfoTags card={card} darkMode={darkMode} />
                    <CardText card={card} darkMode={darkMode} />
                </div>
            </div>
            {relatedCards.length > 0 && <RelatedCards relatedCards={relatedCards} darkMode={darkMode} navigate={navigate} />}
            {isModalOpen && (
                <CardImageModal card={card} imageIndex={imageIndex} setImageIndex={setImageIndex} setIsModalOpen={setIsModalOpen} darkMode={darkMode} />
            )}
        </section>
    );
}

export default CardDetail;
