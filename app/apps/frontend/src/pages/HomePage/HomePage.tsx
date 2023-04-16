import { FC, useEffect } from "react";
import { ApiService, LineChart } from "../../shared";
import { FilterByDuration, FilterByLocation, FilterByOS, FilterDatetime } from "../../features";
import styles from "./HomePage.module.scss";
import { AppLayout } from "../../shared/uikit/AppLayout/AppLayout";
import { $stats, addStats } from "../../entities/stat/model/store";
import { addDevices } from "../../entities";
import { useStore } from "effector-react"
import { Stat } from "../../shared";
import { ChartData } from "chart.js";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const chartDirectionSelector = (stats: Stat[]): ChartData => {
  return {
    labels: stats.map(item => item.date).sort((a, b) => b - a).map(item => new Date(+item).toLocaleTimeString()),
    datasets: [
      {
        label: "Duration",
        data: stats.map(item => item.duration),
        borderColor: "rgb(75, 192, 192)",
        // tension: 20000,
      },
    ],
  };
};

export const HomePage: FC = () => {
  const statsState = useStore($stats);
  const init = async () => {
    const stats = await ApiService.fetchStat();
    addStats(stats);
    const devices = await ApiService.fetchDevices();
    addDevices(devices);
  };

  useEffect(() => {
    init();
  }, []);

  // console.log(statsState);

  return (
    <AppLayout>
      <section className={styles.homePage__filters}>
        <FilterDatetime />
        <FilterByOS />
        <FilterByDuration />
        <FilterByLocation />
      </section>
      <LineChart data={chartDirectionSelector(statsState)} options={options} />
    </AppLayout>
  );
};
