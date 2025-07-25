import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PurchaseGraph = ({ purchases }) => {
  // purchases: [{date, savedAmount}]
  const data = {
    labels: purchases.map((p) => p.date),
    datasets: [
      {
        label: "Savings (₹)",
        data: purchases.map((p) => p.savedAmount),
        borderColor: "#8a2be2",
        backgroundColor: "rgba(138,43,226,0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Your Purchase Savings Over Time" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ background: "#fff", borderRadius: "1rem", padding: "1rem", marginBottom: "2rem" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PurchaseGraph;
