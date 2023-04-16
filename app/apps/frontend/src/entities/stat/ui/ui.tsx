import { FC, memo } from "react";
import { Stat } from "../../../shared";
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
        <section className={styles.card__request}>
          <span className={styles.card__method}>{data.method}</span>
        </section>
        <span className={styles.card__meta}>
          <span>
            <Icon16ClockOutline />
          </span>
          {new Date(+data.date).toLocaleString()}
        </span>
        <span className={styles.card__meta}>
          <span>
            <Icon20BombOutline />
          </span>
          {`Запрос занял ${Math.floor(data.duration / 1000)} с.`}
        </span>
        <span className={styles.card__meta}>
          <span>
            <Icon28SmartphoneOutline />
          </span>
          {`${data.device?.name}, ${data.device?.osVersion}`}
        </span>
        <span className={styles.card__meta}>
          <span>
            <Icon24Globe />
          </span>
          {`${Math.floor(Math.abs(data.size) * 8 / 1e6).toFixed(2)} мб`}
        </span>
      </Card>
    </CardGrid>
  );
});

StatCard.displayName = "StatCard";
