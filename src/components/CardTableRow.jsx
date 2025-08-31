function CardTableRow({ card }) {
    const atkValue = card.atk === -1 ? "?" : card.atk ?? "-";
    const defValue = card.def === -1 ? "?" : card.def ?? "-";

    return (
        <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors divide-x divide-gray-700">
            <td className="px-4 py-2">{card.level || card.linkval || "-"}</td>
            <td className="px-4 py-2">{card.type || "-"}</td>
            <td className="px-4 py-2">{card.race || "-"}</td>
            <td className="px-4 py-2">{card.attribute || "-"}</td>
            <td className="px-4 py-2 font-semibold text-white">{card.name}</td>
            <td className="px-4 py-2">{atkValue}</td>
            <td className="px-4 py-2">{defValue}</td>
            <td className="px-4 py-2">{card.archetype || "-"}</td>
        </tr>
    );
}

export default CardTableRow;
