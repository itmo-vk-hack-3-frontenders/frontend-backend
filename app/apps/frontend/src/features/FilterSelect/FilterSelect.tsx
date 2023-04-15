import { FC } from "react";
import { CustomSelect, CustomSelectOption, CustomSelectOptionInterface } from "@vkontakte/vkui";
import { useQueryParams } from "../../shared";

interface FilterSelectProps {
  keyParam: string
  options: CustomSelectOptionInterface[];
  placeholder?: string;
}

export const FilterSelect: FC<FilterSelectProps> = ({ keyParam, options, placeholder }) => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(keyParam);

  const customSearchFilter = (value: string, option: CustomSelectOptionInterface): boolean =>
    option.label.toLowerCase().includes(value.toLowerCase()) ||
    option.description.toLowerCase().includes(value.toLowerCase());

  const onChange = (evt) => {
    setQueryParam(keyParam, evt.target.value)}

  return (
    <CustomSelect
      value={value}
      placeholder={placeholder}
      searchable
      renderOption={({ option, ...restProps }) => (
        <CustomSelectOption {...restProps} disabled={false} />
      )}
      filterFn={customSearchFilter}
      options={options}
      // onChange={onChange}
      onSelect={onChange}
    />
  );
};
