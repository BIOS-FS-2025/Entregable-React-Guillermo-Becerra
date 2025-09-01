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
    const disableLevel = filters.type === "Spell Card" || filters.type === "Trap Card" || filters.race === "Continuous" || filters.race === "Counter" || filters.race === "Equip" || filters.race === "Field" || filters.race === "Normal" || filters.race === "Quick-Play" || filters.race === "Ritual";
    const disableAttribute = filters.type === "Spell Card" || filters.type === "Trap Card" || filters.race === "Continuous" || filters.race === "Counter" || filters.race === "Equip" || filters.race === "Field" || filters.race === "Normal" || filters.race === "Quick-Play" || filters.race === "Ritual";

    // Deshabilitar Type Monster si Typing es del Spell/Trap group
    const disableMonsterType = filters.race === "Continuous" || filters.race === "Counter" || filters.race === "Equip" || filters.race === "Field" || filters.race === "Normal" || filters.race === "Quick-Play" || filters.race === "Ritual";

    // 🔹 Bloquear Spell/Trap si Level o Attribute están seleccionados, o dependiendo del Typing
    const disableSpellTrap = filters.level !== "" || filters.attribute !== "";
    const disableSpellType = filters.race !== "" && filters.race !== "Continuous" && filters.race !== "Equip" && filters.race !== "Field" && filters.race !== "Normal" && filters.race !== "Quick-Play" && filters.race !== "Ritual";
    const disableTrapType = filters.race !== "" && filters.race !== "Continuous" && filters.race !== "Counter" && filters.race !== "Normal";

    // 🔹 Lógica para Typings según el Type seleccionado
    const disableSpellTrapTypings = filters.type === "Monster Card";
    const disableMonsterTypings = filters.type === "Spell Card" || filters.type === "Trap Card";

    const disableExtraForSpell = filters.type === "Spell Card";
    const disableExtraForTrap = filters.type === "Trap Card";

    return (
        <div className="flex flex-wrap gap-4 mb-4 justify-center">

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
                <option value="Spell Card" disabled={disableSpellTrap || disableSpellType}>Spell Card</option>
                <option value="Trap Card" disabled={disableSpellTrap || disableTrapType}>Trap Card</option>
                <option value="Monster Card" disabled={disableMonsterType}>Monster Card</option>
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
                <optgroup className="text-gray-400 font-medium" label="- Spell/Trap Cards -" disabled={disableSpellTrapTypings}>
                    <option className={`${disableSpellTrapTypings | disableSpellTrap ? "" : "text-gray-200"}`} value="Continuous" disabled={disableSpellTrap}>Continuous</option>
                    <option className={`${disableSpellTrapTypings | disableSpellTrap | disableExtraForSpell ? "" : "text-gray-200"}`} value="Counter" disabled={disableSpellTrap | disableExtraForSpell}>Counter</option>
                    <option className={`${disableSpellTrapTypings | disableSpellTrap | disableExtraForTrap ? "" : "text-gray-200"}`} value="Equip" disabled={disableSpellTrap | disableExtraForTrap}>Equip</option>
                    <option className={`${disableSpellTrapTypings | disableSpellTrap | disableExtraForTrap ? "" : "text-gray-200"}`} value="Field" disabled={disableSpellTrap | disableExtraForTrap}>Field</option>
                    <option className={`${disableSpellTrapTypings | disableSpellTrap ? "" : "text-gray-200"}`} value="Normal" disabled={disableSpellTrap}>Normal</option>
                    <option className={`${disableSpellTrapTypings | disableSpellTrap | disableExtraForTrap ? "" : "text-gray-200"}`} value="Quick-Play" disabled={disableSpellTrap | disableExtraForTrap}>Quick-Play</option>
                    <option className={`${disableSpellTrapTypings | disableSpellTrap | disableExtraForTrap ? "" : "text-gray-200"}`} value="Ritual" disabled={disableSpellTrap | disableExtraForTrap}>Ritual</option>
                </optgroup>

                {/* Grupo Monster */}
                <optgroup className="text-gray-400 font-medium" label="- Monster Cards -" disabled={disableMonsterTypings}>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Aqua">Aqua</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Beast-Warrior">Beast-Warrior</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Beast">Beast</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Creator God">Creator God</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Cyberse">Cyberse</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Dinosaur">Dinosaur</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Divine-Beast">Divine-Beast</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Dragon">Dragon</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Fairy">Fairy</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Fiend">Fiend</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Fish">Fish</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Illusion">Illusion</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Insect">Insect</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Machine">Machine</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Plant">Plant</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Psychic">Psychic</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Pyro">Pyro</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Reptile">Reptile</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Rock">Rock</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Sea Serpent">Sea Serpent</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Spellcaster">Spellcaster</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Thunder">Thunder</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Warrior">Warrior</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Winged Beast">Winged Beast</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Wyrm">Wyrm</option>
                    <option className={`${disableMonsterTypings ? "" : "text-gray-200"}`} value="Zombie">Zombie</option>
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
