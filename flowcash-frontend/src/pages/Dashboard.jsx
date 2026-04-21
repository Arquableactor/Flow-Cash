import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../services/api";

import { useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../components/layout/DashboardLayout";
import MonthlyFlowChart from "../components/charts/MonthlyFlowChart";
import CategoryChart from "../components/charts/CategoryChart";
import IncomeVsExpenseChart from "../components/charts/IncomeVsExpenseChart";
import TransactionList from "../components/transactions/TransactionList";
import TransactionFilter from "../components/transactions/TransactionFilter";
import AnimatedNumber from "../components/ui/AnimatedNumber";

// Variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Dashboard() {
  const [filter, setFilter] = useState("all");

  // 🔥 React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  // 🔥 Estados de carga
  if (isLoading) {
    return (
      <DashboardLayout>
        <p className="text-white p-6">Cargando datos...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="text-red-500 p-6">Error al cargar datos</p>
      </DashboardLayout>
    );
  }

  // 🔥 Datos reales
  const transactions = data || [];

  // 🔥 Filtro
  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  // 🔥 Cálculos
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show">

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6">
          <motion.div variants={item} className="card-glow">
            <p className="text-[#A5B5BF]">Balance</p>
            <h3 className="text-2xl text-cyan-400 font-bold">
              <AnimatedNumber value={balance} />
            </h3>
          </motion.div>

          <motion.div variants={item} className="card-glow">
            <p className="text-[#A5B5BF]">Ingresos</p>
            <h3 className="text-2xl text-green-400 font-bold">
              <AnimatedNumber value={totalIncome} />
            </h3>
          </motion.div>

          <motion.div variants={item} className="card-glow">
            <p className="text-[#A5B5BF]">Gastos</p>
            <h3 className="text-2xl text-red-400 font-bold">
              <AnimatedNumber value={totalExpense} />
            </h3>
          </motion.div>
        </div>

        {/* GRÁFICAS */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <motion.div variants={item}>
            <MonthlyFlowChart />
          </motion.div>
          <motion.div variants={item}>
            <CategoryChart />
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-6">
          <IncomeVsExpenseChart />
        </motion.div>

        {/* TRANSACCIONES */}
        <motion.div variants={item} className="mt-6">
          <TransactionFilter filter={filter} setFilter={setFilter} />
          <TransactionList transactions={filteredTransactions} />
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}