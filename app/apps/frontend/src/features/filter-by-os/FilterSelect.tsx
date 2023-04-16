import { ChangeEvent, FC, useCallback } from "react";
import { CustomSelectOption, Headline, Select } from "@vkontakte/vkui";
import { useQueryParams, MapItem } from "../../shared";

interface FilterSelectProps {
  keyParam: string
  options: MapItem[];
  placeholder?: string;
}

export const FilterSelect: FC<FilterSelectProps> = ({ keyParam, options, placeholder }) => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(keyParam);

  // const customSearchFilter = (value: string, option: MapItem): boolean =>{
  //   return option.label.toLowerCase().includes(value.toLowerCase());
  // };

  const onCustomSelectChange = useCallback(async (event: ChangeEvent<HTMLSelectElement>) => {
    await setQueryParam(keyParam, event.target.value);
  }, [keyParam]);

  return (
    <div>
      <Headline>
        Длина запроса
      </Headline>
      <Select
        options={options}
        placeholder={placeholder}
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
