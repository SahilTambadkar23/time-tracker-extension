import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchWeeklyData } from '../services/api';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeeklyChart = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchWeeklyData(startDate, endDate);
        const labels = res.data.map(item => item._id);
        const data = res.data.map(item => item.total / 1000 / 60);

        setChartData({
          labels,
          datasets: [{
            label: 'Time Spent (min)',
            data,
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderRadius: 8,
          }]
        });
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      }
    };

    loadData();
  }, [startDate, endDate]);

  return (
    <div className="bg-white p-4 rounded shadow">
      {chartData.labels ? (
        <Bar data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default WeeklyChart;
