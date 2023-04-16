import React, { useEffect, useRef } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js/auto";

import { LineController, LineElement, PointElement, LinearScale, Title, Tooltip } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip);

interface LineChartProps {
  type?: "line" | "bar";
  data: ChartData;
  options?: ChartOptions;
}

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

export const LineChart: React.FC<LineChartProps> = ({ type = "line", data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      chartInstanceRef.current = new Chart(chartRef.current, {
        type,
        data,
        options: {
          plugins: {
            customCanvasBackgroundColor: {
              color: "lightGreen",
            },
          },
          ...options,
        },
        plugins: [plugin],
      });
    }
  }, [data, options]);

  return <canvas ref={chartRef} />;
};
