import { ChangeEvent, FC } from "react";
import { CustomSelectOption, Select } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";
import { $devices, applyOsFilter } from "../../entities";
import { useStore } from "effector-react";

const FILTER_KEY = "by-os";

export const FilterByOS: FC = () => {
  const devises = useStore($devices);
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(FILTER_KEY);
  const onChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setQueryParam(FILTER_KEY, evt.target.value);
    applyOsFilter(evt.target.value);
  };

  return (
    <div>
      <h5>
        OS
      </h5>
      <Select
        options={Array.from(new Set(devises.map(item => item.os))).map(item => ({ value: item, label: item }))}
        placeholder={"Выберете OS"}
        searchable={true}
        value={value}
        renderOption={({ ...restProps }) => (
          <CustomSelectOption {...restProps} />
        )}
        onChange={onChange}
      />
    </div>
  );
};
