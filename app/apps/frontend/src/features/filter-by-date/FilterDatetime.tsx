import { DateInput } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";
import styles from "./FilterDatetime.module.scss";
import { FC } from "react";
import { applyDateFilter } from "../../entities";

export const FilterDatetime: FC = () => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const start = Number(getQueryParam("starttime"));
  const end = Number(getQueryParam("endtime"));

  const onChangeStart = (date: Date) => {
    setQueryParam("starttime", String(date && date.getTime()));
    applyDateFilter({ start: date, end: new Date(end) });
  };

  const onChangeEnd = (date: Date) => {
    setQueryParam("endtime", String(date && date.getTime()));
    applyDateFilter({ start: new Date(start), end: date });
  };

  return (
    <div className={styles.filter}>
      <h5>
        Выбор времени
      </h5>
      <div className={styles.filter__pickers}>
        <DateInput value={start ? new Date(+start) : new Date()}
          onChange={onChangeStart} />
        <DateInput value={end ? new Date(+end) : new Date()}
          onChange={onChangeEnd} />
      </div>
    </div>
  );
};
