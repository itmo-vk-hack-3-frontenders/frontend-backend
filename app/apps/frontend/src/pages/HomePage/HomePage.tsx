import { FC, useEffect } from "react";
import { FilterByDuration, FilterByMethod, FilterByOS, FilterDatetime } from "../../features";
import styles from "./HomePage.module.scss";
import { AppLayout } from "../../shared";
import { $stats, $totalPages, fetchDevicesFx, fetchStatsFx } from "../../entities";
import { StatCard } from "../../entities";
import { useStore } from "effector-react";
import { Group, Pagination, ScreenSpinner } from "@vkontakte/vkui";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";

export const HomePage: FC = () => {
  const stats = useStore($stats);
  const pages = useStore($totalPages);
  const loading = useStore(fetchStatsFx.pending);
  const isReady = stats.length > 0;

  useEffect(() => {
    fetchStatsFx();
    fetchDevicesFx();
  }, []);

  return (
    <AppLayout>
      <section className={styles.homePage__filters}>
        <FilterDatetime />
        <FilterByOS />
        <FilterByDuration />
        <FilterByMethod />
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
        <Pagination className={styles.homePage__pagination} totalPages={pages} />
      </Group>
      <Group header={(
        <h4>
          Статистика по объему трафика
        </h4>
      )}>
        <VictoryChart
          height={400}
          theme={VictoryTheme.material}
          width={400}>
          <VictoryArea
            label={"Заголовок"}
            data={stats.map(stat => {
              return {
                x: stat.date,
                y: stat.size,
              };
            })} />
        </VictoryChart>
      </Group>
    </AppLayout>
  );
};
