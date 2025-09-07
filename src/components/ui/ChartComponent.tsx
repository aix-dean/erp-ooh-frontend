import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartComponentProps {
  type: 'bar' | 'pie';
  data: any;
  options?: any;
  title: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ type, data, options, title }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const chartOptions = options ? { ...defaultOptions, ...options } : defaultOptions;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {type === 'bar' && <Bar data={data} options={chartOptions} />}
      {type === 'pie' && <Pie data={data} options={chartOptions} />}
    </div>
  );
};

export default ChartComponent;