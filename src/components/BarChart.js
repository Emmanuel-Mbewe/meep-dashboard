import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BarChart = (props) => {
  const chartRef = useRef();
  const chartObj = useRef();

  const createBarChart = (el) => {
    const data = [
      { year: 2024, count: 10 },
      { year: 2025, count: 0 },
      { year: 2026, count: 0 },
    ];

    chartObj.current = new Chart(el, {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Students' performance by year",
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  };

  useEffect(() => {
    const el = chartRef.current;
    if (chartObj.current) chartObj.current.destroy();
    createBarChart(el);

    return () => chartObj.current.destroy();
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
