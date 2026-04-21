import Chart from "react-apexcharts";

export default function MonthlyFlowChart() {
  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent"
    },
    theme: {
      mode: "dark"
    },
    stroke: {
      curve: "smooth"
    },
    colors: ["#00D4FF", "#FF6B6B"],
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      labels: {
        style: {
          colors: "#A5B5BF"
        }
      }
    },
    yaxis: {
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
      data: [500, 800, 600, 900, 1200, 1000]
    },
    {
      name: "Gastos",
      data: [300, 400, 500, 600, 700, 650]
    }
  ];

  return (
    <div className="bg-[#0B1220] p-6 rounded-xl border border-[#1B2A3A]">
      <h3 className="mb-4 text-[#A5B5BF]">Flujo mensual</h3>
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
}