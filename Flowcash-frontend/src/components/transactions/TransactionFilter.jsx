import { useState } from "react";

export default function TransactionFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
  });

  const updateFilters = (newValues) => {
    const updated = { ...filters, ...newValues };
    setFilters(updated);
    onFilter(updated);
  };

  return (
    <div className="bg-[#050816] p-4 rounded-xl border border-[#1B2A3A] mb-4 flex flex-wrap gap-4 items-center">

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar..."
        value={filters.search}
        onChange={(e) =>
          updateFilters({ search: e.target.value })
        }
        className="px-3 py-2 bg-[#0B1220] text-white rounded w-48"
      />

      {/* FILTRO TIPO */}
      <div className="flex gap-2">
        <button
          onClick={() => updateFilters({ type: "all" })}
          className={`px-3 py-1 rounded ${
            filters.type === "all"
              ? "bg-[#00D4FF] text-black"
              : "bg-[#1B2A3A]"
          }`}
        >
          Todas
        </button>

        <button
          onClick={() => updateFilters({ type: "income" })}
          className={`px-3 py-1 rounded ${
            filters.type === "income"
              ? "bg-green-400 text-black"
              : "bg-[#1B2A3A]"
          }`}
        >
          Ingresos
        </button>

        <button
          onClick={() => updateFilters({ type: "expense" })}
          className={`px-3 py-1 rounded ${
            filters.type === "expense"
              ? "bg-red-400 text-black"
              : "bg-[#1B2A3A]"
          }`}
        >
          Gastos
        </button>
      </div>

      {/* FILTRO CATEGORÍA */}
      <select
        value={filters.category}
        onChange={(e) =>
          updateFilters({ category: e.target.value })
        }
        className="px-3 py-2 bg-[#0B1220] text-white rounded"
      >
        <option value="all">Categoría</option>
        <option value="food">Comida</option>
        <option value="transport">Transporte</option>
        <option value="entertainment">Entretenimiento</option>
        <option value="other">Otros</option>
      </select>

      {/* RESET */}
      <button
        onClick={() =>
          updateFilters({
            search: "",
            type: "all",
            category: "all",
          })
        }
        className="bg-red-500 px-3 py-2 rounded text-white"
      >
        Limpiar
      </button>
    </div>
  );
}