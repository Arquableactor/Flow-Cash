import Chart from "react-apexcharts";

export default function CategoryChart() {
  const options = {
    chart: {
      type: "donut"
    },
    labels: ["Comida", "Transporte", "Entretenimiento", "Otros"],
    colors: ["#00D4FF", "#FF6B6B", "#FFC857", "#00E6A8"],
    legend: {
      labels: {
        colors: "#EAF4FF"
      }
    }
  };

  const series = [400, 300, 200, 100];

  return (
    <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
      <h3 className="mb-4 text-[#A5B5BF]">Gastos por categoría</h3>
      <Chart options={options} series={series} type="donut" height={300} />
    </div>
  );
}