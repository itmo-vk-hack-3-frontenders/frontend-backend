import { DateInput, Headline } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";
import styles from "./FilterDatetime.module.scss";
import { FC } from "react";
import { applyDateFilter } from "../../entities/stat/model/store";

export const FilterDatetime: FC = () => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const start = Number(getQueryParam("starttime"));
  const end = Number(getQueryParam("endtime"));

  const onChangeStart = (date: Date) => {
    setQueryParam("starttime", String(date && Math.floor(date.getTime() / 1000)));
    applyDateFilter({ start: date, end: new Date(end * 1000) });
  };

  const onChangeEnd = (date: Date) => {
    setQueryParam("endtime", String(date && Math.floor(date.getTime() / 1000)));
    applyDateFilter({  start:  new Date(start * 1000), end: date });
  };

  return (
    <div className={styles.filter}>
      <Headline level={"2"}>
        Выбор времени
      </Headline>
      <div className={styles.filter__pickers}>
        <DateInput value={start ? new Date(start * 1000) : new Date()}
          onChange={onChangeStart} />
        <DateInput value={end ? new Date(end * 1000) :  new Date()}
          onChange={onChangeEnd} />
      </div>
    </div>
  );
};
