import { useEffect, useState } from "react";
import CardTableRow from "./CardTableRow";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { useTheme } from "../context/ThemeContext";

function CardTable() {

    const { darkMode } = useTheme();

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

    // Manejo de ordenación
    const handleSort = (column) => {
        if (sortColumn === column) {
            // Si ya estamos ordenando por esta columna, invertimos el orden
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // Si es una nueva columna, empezamos en ascendente
            setSortColumn(column);
            setSortOrder("asc");
        }

        // 🔹 Si se ordena por Level/Rank, ATK o DEF, forzamos filtro a Monster
        if (["level", "atk", "def"].includes(column)) {
            setFilters((prev) => ({
                ...prev,
                type: "Monster Card"
            }));
        }
    };

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
            {loading && (
                <div className="flex flex-col items-center justify-center py-6">
                    {/* Spinner */}
                    <div className="w-20 h-20 border-8 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    {/* Texto */}
                    <p className="mt-3 text-center text-gray-400 text-2xl font-medium">
                        Loading cards...
                    </p>
                </div>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <>

                    {/* Barra de búsqueda y Filtros */}
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <FilterBar filters={filters} setFilters={setFilters} />

                    {/* Tabla */}
                    <div className="overflow-x-auto">
                        <table className={`${darkMode ? "bg-gray-900" : "bg-gray-800"} min-w-full text-gray-300 rounded-lg overflow-hidden`}>
                            <thead>
                                <tr className={`${darkMode ? "bg-gray-950 divide-gray-800" : "bg-gray-700 divide-gray-600"} text-blue-400 divide-x`}>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("level")}>
                                        Level/Rank{renderSortArrow("level")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("name")}>
                                        Name{renderSortArrow("name")}
                                    </th>
                                    <th className="px-4 py-2 text-left">Type</th>
                                    <th className="px-4 py-2 text-left">Typing</th>
                                    <th className="px-4 py-2 text-left">Attribute</th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("atk")}>
                                        ATK{renderSortArrow("atk")}
                                    </th>
                                    <th className="px-4 py-2 text-left cursor-pointer" onClick={() => handleSort("def")}>
                                        DEF{renderSortArrow("def")}
                                    </th>
                                    <th className="px-4 py-2 text-left">Archetype</th>
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
