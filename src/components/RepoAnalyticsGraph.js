// src/components/RepoAnalyticsGraph.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const RepoAnalyticsGraph = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return (
      <div className="dashboard-section">
        <div className="dashboard-card">
          <h2 className="dashboard-title">Repository Analytics</h2>
          <p className="dashboard-note">No repository data available to display.</p>
        </div>
      </div>
    );
  }

  const repoNames = repos.map((repo) => repo.name);
  const starCounts = repos.map((repo) => repo.stargazers_count);

  const data = {
    labels: repoNames,
    datasets: [
      {
        label: "⭐ Stars",
        data: starCounts,
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderColor: "#6366f1",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "GitHub Repositories: Stars Distribution",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `⭐ Stars: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 0,
        },
        title: {
          display: true,
          text: "Repositories",
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Stars Count",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-card" style={{ height: "400px", width: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RepoAnalyticsGraph;
