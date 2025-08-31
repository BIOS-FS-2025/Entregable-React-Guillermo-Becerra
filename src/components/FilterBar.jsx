function FilterBar({ filters, setFilters, allTypings }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({
            level: "",
            type: "",
            race: "",
            attribute: ""
        });
    };

    // 🔹 Deshabilitar Level si Type es Spell o Trap
    const disableLevel = filters.type === "Spell Card" || filters.type === "Trap Card";
    const disableAttribute = filters.type === "Spell Card" || filters.type === "Trap Card";

    // 🔹 Bloquear Spell/Trap si Level o Attribute están seleccionados
    const disableSpellTrap = filters.level !== "" || filters.attribute !== "";

    return (
        <div className="flex flex-wrap gap-4 mb-4">

            {/* Level/Rank */}
            <select
                name="level"
                value={filters.level}
                onChange={handleChange}
                disabled={disableLevel}
                className={`px-3 py-2 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disableLevel ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <option value="">All Levels</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>

            {/* Type (Spell / Trap / Monster) */}
            <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="px-3 py-2 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Types</option>
                <option value="Spell Card" disabled={disableSpellTrap}>Spell Card</option>
                <option value="Trap Card" disabled={disableSpellTrap}>Trap Card</option>
                <option value="Monster Card">Monster Card</option>
            </select>

            {/* Typing */}
            <select
                name="race"
                value={filters.race}
                onChange={handleChange}
                className="px-3 py-2 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Typings</option>

                {/* Grupo Spell/Trap */}
                <optgroup label="Spell/Trap Cards">
                    <option value="Continuous" disabled={disableSpellTrap}>Continuous</option>
                    <option value="Counter" disabled={disableSpellTrap}>Counter</option>
                    <option value="Equip" disabled={disableSpellTrap}>Equip</option>
                    <option value="Field" disabled={disableSpellTrap}>Field</option>
                    <option value="Normal" disabled={disableSpellTrap}>Normal</option>
                    <option value="Quick-Play" disabled={disableSpellTrap}>Quick-Play</option>
                    <option value="Ritual" disabled={disableSpellTrap}>Ritual</option>
                </optgroup>

                {/* Grupo Monster */}
                <optgroup label="Monster Cards">
                    <option value="Aqua">Aqua</option>
                    <option value="Beast-Warrior">Beast-Warrior</option>
                    <option value="Beast">Beast</option>
                    <option value="Creator God">Creator God</option>
                    <option value="Cyberse">Cyberse</option>
                    <option value="Dinosaur">Dinosaur</option>
                    <option value="Divine-Beast">Divine-Beast</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Fairy">Fairy</option>
                    <option value="Fiend">Fiend</option>
                    <option value="Fish">Fish</option>
                    <option value="Illusion">Illusion</option>
                    <option value="Insect">Insect</option>
                    <option value="Machine">Machine</option>
                    <option value="Plant">Plant</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Pyro">Pyro</option>
                    <option value="Reptile">Reptile</option>
                    <option value="Rock">Rock</option>
                    <option value="Sea Serpent">Sea Serpent</option>
                    <option value="Spellcaster">Spellcaster</option>
                    <option value="Thunder">Thunder</option>
                    <option value="Warrior">Warrior</option>
                    <option value="Winged Beast">Winged Beast</option>
                    <option value="Wyrm">Wyrm</option>
                    <option value="Zombie">Zombie</option>
                </optgroup>
            </select>

            {/* Attribute */}
            <select
                name="attribute"
                value={filters.attribute}
                onChange={handleChange}
                disabled={disableAttribute}
                className={`px-3 py-2 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${disableLevel ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <option value="">All Attributes</option>
                <option value="DARK">DARK</option>
                <option value="LIGHT">LIGHT</option>
                <option value="WIND">WIND</option>
                <option value="FIRE">FIRE</option>
                <option value="EARTH">EARTH</option>
                <option value="WATER">WATER</option>
                <option value="DIVINE">DIVINE</option>
            </select>

            {/* Botón de reset */}
            <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
                Reset Filters
            </button>
        </div>
    );
}

export default FilterBar;
