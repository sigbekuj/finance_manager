import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Charts({ transactions }) {
  // Filter expenses only
  const expenses = transactions.filter(t => t.type === "expense");

  // Group by category
  const categoryTotals = {};
  expenses.forEach(t => {
    if (!categoryTotals[t.category]) {
      categoryTotals[t.category] = 0;
    }
    categoryTotals[t.category] += Number(t.amount);
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
      },
    ],
  };

  return (
    <div style={{ width: "400px" }}>
      <h3>Spending by Category</h3>
      <Pie data={data} />
    </div>
  );
}

export default Charts;