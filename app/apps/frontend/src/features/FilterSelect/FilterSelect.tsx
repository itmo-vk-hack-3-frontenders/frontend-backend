import { FC } from "react";
import { CustomSelect, CustomSelectOption, CustomSelectOptionInterface } from "@vkontakte/vkui";
import { useQueryParams} from "../../shared";

interface FilterSelectProps {
  key: string
  options: CustomSelectOptionInterface[];
  placeholder?: string;
}

export const FilterSelect: FC<FilterSelectProps> = ({ key, options, placeholder }) => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const value = getQueryParam(key);

  const customSearchFilter = (value: string, option: CustomSelectOptionInterface): boolean =>
    option.label.toLowerCase().includes(value.toLowerCase()) ||
    option.description.toLowerCase().includes(value.toLowerCase());

  return (
    <CustomSelect
      value={value}
      placeholder={placeholder}
      searchable={true}
      renderOption={({ option }) => (
        <CustomSelectOption description={option.description} />
      )}
      filterFn={customSearchFilter}
      options={options}
      onChange={(evt) => setQueryParam(key, evt.target.value)}
    />
  );
};
