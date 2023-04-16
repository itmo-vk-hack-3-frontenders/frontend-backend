import { ChangeEvent, FC } from "react";
import { CustomSelectOption, Headline, Select } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";

const FILTER_KEY = "by-os";

const list = [
  {
    label: "34543",
    value: "3",
  },
  {
    label: "5.54.35",
    value: "4",
  },
];

export const FilterByOS: FC = () => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(FILTER_KEY);

  const onCustomSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setQueryParam(FILTER_KEY, event.target.value);
  };

  return (
    <div>
      <Headline>
        Длина запроса
      </Headline>
      <Select
        options={list}
        placeholder={"OS"}
        searchable={true}
        value={value}
        renderOption={({ ...restProps }) => (
          <CustomSelectOption {...restProps} />
        )}
        onChange={onCustomSelectChange}
      />
    </div>
  );
};
