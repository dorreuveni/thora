import React from "react";
import { Bar } from "react-chartjs-2";
import "./BarGraph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = (props) => {
  const { title, labels, numbers, totalValue } = props;

  //if missing data return
  if (!labels || !numbers || !totalValue) return;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "חיפושים",
        data: numbers,
        backgroundColor: [
          "rgba(211, 211, 211, 1)",
          "rgba(0, 0, 139, 1)",
          "rgba(216, 191, 216, 1)",
          "rgba(173, 216, 230, 1)",
          "rgba(211, 211, 211, 1)",
          "rgba(0, 0, 139, 1)",
          "rgba(216, 191, 216, 1)",
          "rgba(173, 216, 230, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
          weight: "bold",
          family: "Arial",
        },
        color: "rgba(75, 192, 192, 1)",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const percentage = ((value / totalValue) * 100).toFixed(2);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
          font: {
            size: 20,
            family: "Arial",
          },
          color: "rgba(54, 162, 235, 1)",
        },
        grid: {
          color: "rgba(75, 192, 192, 0.2)",
        },
      },
      y: {
        max: totalValue, // Set the top of the y-axis to 100%
        ticks: {
          stepSize: totalValue / 10, // Increment by 10%
          callback: function (value) {
            // Calculate the raw value for each tick value
            const rawValue = value.toFixed(0);
            const percentage = ((value * 100) / totalValue).toFixed(0);
            return `${rawValue} (${percentage}%)`;
          },
          font: {
            size: 12,
            family: "Arial",
          },
          color: "rgba(54, 162, 235, 1)",
        },
        grid: {
          color: "rgba(75, 192, 192, 0.2)",
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <Bar data={data} options={options} height={400} />
    </div>
  );
};

export default BarGraph;
