import { DateInput } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";
import styles from "./FilterDatetime.module.scss";

export const FilterDatetime = (): FC => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const start = Number(getQueryParam("starttime"));
  const end = Number(getQueryParam("endtime"));
  return (
    <div className={styles.filter}>
      <DateInput enableTime value={start ? new Date(start * 1000) : new Date()} onChange={(date) => setQueryParam("starttime", String(date && Math.floor(date.getTime() / 1000)))} />
      <DateInput enableTime value={end ? new Date(end * 1000) :  new Date()} onChange={(date) => setQueryParam("endtime", String(date && Math.floor(date.getTime() / 1000)))} />
    </div>
  );
};
