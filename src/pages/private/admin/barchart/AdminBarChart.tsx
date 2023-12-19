import React, { FC, useEffect, useRef } from 'react';

import Chart from 'chart.js/auto';

import { Wrapper } from './AdminBarChart.styled';

interface AdminBarChartProps {
  data: { labels: string[]; values: number[] };
  selectedYear: number | null;
}

const AdminBarChart: FC<AdminBarChartProps> = ({ data, selectedYear }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const chartTitle = selectedYear === null ? 'Все время' : selectedYear.toString();

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      const maxDataValue = Math.max(...data.values);

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              borderWidth: 1
            }
          ]
        },
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 0.5,
              to: 0,
              loop: true
            }
          },
          scales: {
            y: {
              min: 0,
              max:
                maxDataValue < 100
                  ? 100
                  : maxDataValue < 500
                  ? 500
                  : maxDataValue < 1000
                  ? 1000
                  : maxDataValue < 5000
                  ? 5000
                  : maxDataValue < 10000
                  ? 10000
                  : maxDataValue < 50000
                  ? 50000
                  : maxDataValue
            },
            x: {
              type: 'category',
              labels: selectedYear === null ? data.labels : data.labels.map((year) => year.toString())
            }
          }
        }
      });
    }
  }, [data, selectedYear, chartTitle]);

  return (
    <Wrapper>
      <canvas ref={chartRef} />
    </Wrapper>
  );
};

export default AdminBarChart;
