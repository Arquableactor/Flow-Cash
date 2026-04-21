export default function TransactionFilter({ filter, setFilter }) {
  return (
    <div className="flex gap-3 mb-4">

      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded ${
          filter === "all"
            ? "bg-[#00D4FF] text-black"
            : "bg-[#1B2A3A]"
        }`}
      >
        Todas
      </button>

      <button
        onClick={() => setFilter("income")}
        className={`px-3 py-1 rounded ${
          filter === "income"
            ? "bg-green-400 text-black"
            : "bg-[#1B2A3A]"
        }`}
      >
        Ingresos
      </button>

      <button
        onClick={() => setFilter("expense")}
        className={`px-3 py-1 rounded ${
          filter === "expense"
            ? "bg-red-400 text-black"
            : "bg-[#1B2A3A]"
        }`}
      >
        Gastos
      </button>

    </div>
  );
}