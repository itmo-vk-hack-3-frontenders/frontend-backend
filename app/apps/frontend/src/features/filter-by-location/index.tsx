import { FC } from "react";
import { CustomSelectOption, Select } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";
import { applyLocationFilter } from "../../entities";

const FILTER_KEY = "by-duration";

export const FilterByLocation: FC = () => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(FILTER_KEY);

  const onChange = (evt) => {
    setQueryParam(FILTER_KEY, evt.target.value);
    applyLocationFilter(evt.target.value);
  };

  return (
    <div>
      <h5>
        Место вызова
      </h5>
      <Select
        options={[]}
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
