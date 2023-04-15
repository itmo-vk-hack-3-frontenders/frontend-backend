import { FC, useEffect, useRef } from "react";
import { Chart, ChartData } from "chart.js";

interface LineChartProps {
  data: ChartData
}

export const LineChart: FC<LineChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: data,
      });
    }
  }, [data]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};
