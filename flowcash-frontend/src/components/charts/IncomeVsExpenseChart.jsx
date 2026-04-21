import Chart from "react-apexcharts";

export default function IncomeVsExpenseChart() {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    colors: ["#00E6A8", "#FF6B6B"],
    xaxis: {
      categories: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
      labels: {
        style: {
          colors: "#A5B5BF"
        }
      }
    },
    legend: {
      labels: {
        colors: "#EAF4FF"
      }
    },
    grid: {
      borderColor: "#1B2A3A"
    }
  };

  const series = [
    {
      name: "Ingresos",
      data: [200, 400, 300, 500]
    },
    {
      name: "Gastos",
      data: [150, 300, 250, 400]
    }
  ];

  return (
    <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
      <h3 className="mb-4 text-[#A5B5BF]">Ingresos vs Gastos</h3>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}