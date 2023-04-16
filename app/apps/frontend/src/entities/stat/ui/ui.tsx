import { FC, memo } from "react";
import { Stat } from "../../../shared/api/services/types";
import { Card, CardGrid } from "@vkontakte/vkui";
import styles from "./StatCard.module.scss";
import clsx from "clsx";
import { Icon16ClockOutline } from "@vkontakte/icons";
import { Icon28SmartphoneOutline } from "@vkontakte/icons";
import { Icon24Globe } from "@vkontakte/icons";
import { Icon20BombOutline } from "@vkontakte/icons";

type StatCardProps = {
  data: Stat
}

export const StatCard: FC<StatCardProps> = memo((props) => {
  const { data } = props;

  return (
    <CardGrid className={styles.card} size={"m"}>
      <Card className={clsx(styles.card, styles.card__body)} mode="shadow">
        <a href={data.url} rel="noreferrer" target={"_blank"}>
          <h3>{data.url}</h3>
        </a>
        <section>
          <span className={styles.card__method}>{data.method}</span>
        </section>
        <span className={styles.card__meta}>
          <Icon16ClockOutline />
          {new Date(+data.date).toLocaleString()}
        </span>
        <span className={styles.card__meta}>
          <Icon20BombOutline />
          {`Запрос занял ${Math.floor(data.duration / 1000)} с.`}
        </span>
        <span className={styles.card__meta}>
          <Icon28SmartphoneOutline />
          {data.device?.name}
        </span>
        <span className={styles.card__meta}>
          <Icon24Globe />
          {`${Math.floor(Math.abs(data.size) * 8 / 1e6).toFixed(2)} мб`}
        </span>
      </Card>
    </CardGrid>
  );
});

StatCard.displayName = "StatCard";
