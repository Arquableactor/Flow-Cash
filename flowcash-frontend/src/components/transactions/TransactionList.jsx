export default function TransactionItem({ tx }) {
  if (!tx) return null;

  return (
    <div className="flex justify-between items-center p-3 bg-[#050816] rounded-lg border border-[#1B2A3A]">
      <div>
        <p className="font-semibold">{tx.description}</p>
        <p className="text-sm text-[#A5B5BF]">{tx.category}</p>
      </div>

      <p
        className={`font-bold ${
          tx.type === "income" ? "text-green-400" : "text-red-400"
        }`}
      >
        {tx.type === "income" ? "+" : "-"}${tx.amount}
      </p>
    </div>
  );
}