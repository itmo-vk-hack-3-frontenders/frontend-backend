import { FC } from "react";
import { Input, Slider } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";
import { applyDurationFilter } from "../../entities";

const FILTER_KEY = "by-duration";

export const FilterByDuration: FC = () => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = Number(getQueryParam(FILTER_KEY));

  const onChange = (value: number) => {
    setQueryParam(FILTER_KEY, String(value));
    applyDurationFilter(value);
  };

  return (
    <div>
      <h5>
        Фильтр по длительности запроса
      </h5>
      <Slider max={20} min={0} value={value} onChange={onChange} />
      <Input readOnly value={value} />
    </div>
  );
};
