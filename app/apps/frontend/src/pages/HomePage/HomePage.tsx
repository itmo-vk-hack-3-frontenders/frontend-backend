import { FC, useEffect } from "react";
import { LineChart, Stat } from "../../shared";
import { FilterByDuration, FilterByLocation, FilterByOS, FilterDatetime } from "../../features";
import styles from "./HomePage.module.scss";
import { AppLayout } from "../../shared";
import { $stats, fetchStatsFx } from "../../entities";
import { StatCard } from "../../entities";
import { useStore } from "effector-react";
import { Group, Pagination, ScreenSpinner } from "@vkontakte/vkui";
import { ChartData } from "chart.js/auto";

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
  const stats = useStore($stats);
  const loading = useStore(fetchStatsFx.pending);
  const isReady = stats.length > 0;

  useEffect(() => {
    fetchStatsFx();
  }, []);

  return (
    <AppLayout>
      <section className={styles.homePage__filters}>
        <FilterDatetime />
        <FilterByOS />
        <FilterByDuration />
        <FilterByLocation />
      </section>
      <Group header={(
        <h4>
          Список доступных статистик
        </h4>
      )}>
        {
          loading && <ScreenSpinner state="loading" style={{
            zIndex: 100,
          }} />
        }
        {
          isReady && <div className={styles.homePage__card_wrapper}>
            {
              stats.map((stat, index) => {
                return (
                  <StatCard data={stat} key={index} />
                );
              })
            }
          </div>
        }
        <Pagination className={styles.homePage__pagination} />
      </Group>
      <LineChart data={chartDirectionSelector(stats)} options={options} />
    </AppLayout>
  );
};
