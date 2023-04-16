import { FC } from "react";
import { CustomSelectOption, Headline, Select } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";
import { applyLocationFilter } from "../../entities/stat/model/store";

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
      <Headline>
        Место вызова
      </Headline>
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
