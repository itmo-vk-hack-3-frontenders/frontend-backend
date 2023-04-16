import { FC } from "react";
import { CustomSelect, CustomSelectOption } from "@vkontakte/vkui";
import { useQueryParams, MapItem } from "../../shared";

interface FilterSelectProps {
  keyParam: string
  options: MapItem[];
  placeholder?: string;
}

export const FilterSelect: FC<FilterSelectProps> = ({ keyParam, options, placeholder }) => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(keyParam);

  const customSearchFilter = (value: string, option: MapItem): boolean =>{
    return option.label.toLowerCase().includes(value.toLowerCase());
  };

  const onChange = (evt) => {
    setQueryParam(keyParam, evt.target.value)}

  return (
    <CustomSelect
      renderOption={({ ...restProps }) => (
        <CustomSelectOption {...restProps} />
      )}
      value={value}
      placeholder={placeholder}
      filterFn={customSearchFilter}
      options={options}
      searchable={true}
      onChange={onChange}
    />
  );
};
