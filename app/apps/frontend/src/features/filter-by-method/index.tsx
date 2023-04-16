import { FC } from "react";
import { CustomSelectOption, Select } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";
import { $stats, applyMethodFilter } from "../../entities";
import { useStore } from "effector-react";

const FILTER_KEY = "by-method";

export const FilterByMethod: FC = () => {
  const stats = useStore($stats);
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(FILTER_KEY);

  const onChange = (evt) => {
    setQueryParam(FILTER_KEY, evt.target.value);
    applyMethodFilter(evt.target.value);
  };

  return (
    <div>
      <h5>
        Метод
      </h5>
      <Select
        options={Array.from(new Set(stats.map(item => item.method))).map(item => ({ value: item, label: item }))}
        placeholder="Не выбран"
        value={value}
        renderOption={({ option, ...restProps }) => (
          <CustomSelectOption
            {...restProps}
            key={option.value}
          />
        )}
        onChange={onChange}
      />
    </div>
  );
};
