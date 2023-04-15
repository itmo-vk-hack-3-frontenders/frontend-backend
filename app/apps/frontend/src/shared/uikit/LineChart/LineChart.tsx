import React, { useEffect, useRef } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js/auto";

// Импортируем контроллер для графика типа "line"
import { LineController, LineElement, PointElement, LinearScale, Title, Tooltip } from "chart.js";

// Регистрируем контроллер для графика типа "line"
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip);

interface LineChartProps {
  data: ChartData;
  options?: ChartOptions;
}

export const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data,
        options,
      });
    }
  }, [data, options]);

  return <canvas ref={chartRef} />;
};
