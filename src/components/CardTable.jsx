import { useEffect, useState } from "react";
import CardTableRow from "./CardTableRow";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

function CardTable() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 20;

    // Ordenación
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"

    //Filtros
    const [filters, setFilters] = useState({
        level: "",
        type: "",
        race: "",
        attribute: ""
    });


    // Nuevo estado para búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    // 🔹 Aquí va el useEffect para resetear la página al filtrar
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
                const data = await res.json();
                setCards(data.data);
            } catch (err) {
                setError("Failed to load cards.");
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    // Filtrado por búsqueda
    const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.level === "" || (card.level?.toString() === filters.level || card.rank?.toString() === filters.level)) &&
        (filters.type === "" ||
            (filters.type === "Monster Card" ? card.type.includes("Monster") : card.type === filters.type)
        ) &&
        (filters.race === "" || card.race === filters.race) &&
        (filters.attribute === "" || card.attribute === filters.attribute)
    );


    // Ordenar
    const sortedCards = [...filteredCards].sort((a, b) => {
        if (!sortColumn) return 0;

        const valA = a[sortColumn] ?? "";
        const valB = b[sortColumn] ?? "";

        if (!isNaN(valA) && !isNaN(valB)) {
            return sortOrder === "asc" ? valA - valB : valB - valA;
        }

        return sortOrder === "asc"
            ? String(valA).localeCompare(String(valB))
            : String(valB).localeCompare(String(valA));
    });

    // Calcular paginación después de ordenar
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = sortedCards.slice(indexOfFirstCard, indexOfLastCard);

    // Helper para mostrar flecha en la columna ordenada
    const renderSortArrow = (column) => {
        if (sortColumn !== column) return "";
        return sortOrder === "asc" ? " ▲" : " ▼";
    };

    return (
        <div>
            {loading && <p className="text-center text-gray-400">Loading cards...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <>

                    {/* Barra de búsqueda */}
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <FilterBar filters={filters} setFilters={setFilters} />

                    {/* Tabla */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 text-gray-300 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-700 text-blue-400 divide-x divide-gray-600">
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("level")}>
                                        Level/Rank{renderSortArrow("level")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("name")}>
                                        Name{renderSortArrow("name")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("type")}>
                                        Type{renderSortArrow("type")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("race")}>
                                        Typing{renderSortArrow("race")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("attribute")}>
                                        Attribute{renderSortArrow("attribute")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("atk")}>
                                        ATK{renderSortArrow("atk")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("def")}>
                                        DEF{renderSortArrow("def")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("archetype")}>
                                        Archetype{renderSortArrow("archetype")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCards.map(card => (
                                    <CardTableRow key={card.id} card={card} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    <Pagination
                        totalCards={filteredCards.length} // 🔹 usar filteredCards aquí
                        cardsPerPage={cardsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}

export default CardTable;
