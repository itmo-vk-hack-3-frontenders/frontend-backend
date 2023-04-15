import { FC } from "react";
import { CustomSelect, CustomSelectOption, CustomSelectOptionInterface } from "@vkontakte/vkui";
import { useUrlParams } from "../../shared"

interface FilterSelectProps {
  options: CustomSelectOptionInterface[];
  placeholder?: string;
}

export const FilterSelect: FC<FilterSelectProps> = ({ options, placeholder }) => {
  const {} = useUrl


  const customSearchFilter = (value: string, option: CustomSelectOptionInterface): boolean =>
    option.label.toLowerCase().includes(value.toLowerCase()) ||
    option.description.toLowerCase().includes(value.toLowerCase());

  return (
    <CustomSelect
      value={}
      placeholder={placeholder}
      searchable={true}
      renderOption={({ option }) => (
        <CustomSelectOption description={option.description} />
      )}
      filterFn={customSearchFilter}
      options={options}
    />
  );
};
