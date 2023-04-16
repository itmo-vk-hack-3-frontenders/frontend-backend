import { FC, Suspense, useEffect, useState } from "react";
import { ApiService, LineChart } from "../../shared";
import { FilterByDuration, FilterByLocation, FilterByOS, FilterDatetime } from "../../features";
import styles from "./HomePage.module.scss";
import { AppLayout } from "../../shared/uikit/AppLayout/AppLayout";
import { $stats, addStats, fetchStatsFx } from "../../entities/stat/model/store";
import { addDevices, StatCard } from "../../entities";
import { useStore, useUnit } from "effector-react";
import { Group, Headline, Pagination, ScreenSpinner } from "@vkontakte/vkui";

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


export const HomePage: FC = () => {
  const stats = useStore($stats);
  const loading = useStore(fetchStatsFx.pending);

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
          fetchStatsFx.doneData.length > 0 && <div className={styles.homePage__card_wrapper}>
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
      {/*<LineChart data={data} options={options} />*/}
    </AppLayout>
  );
};
