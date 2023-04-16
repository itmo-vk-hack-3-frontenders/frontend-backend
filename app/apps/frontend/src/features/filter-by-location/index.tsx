import { FC } from "react";
import { CustomSelectOption, Headline, Select } from "@vkontakte/vkui";

export const FilterByLocation: FC = () => {
  return (
    <div>
      <Headline>
        Место вызова
      </Headline>
      <Select
        options={[]}
        placeholder="Не выбран"
        renderOption={({ option, ...restProps }) => (
          <CustomSelectOption
            {...restProps}
            key={option.value}
          />
        )}
      />
    </div>
  );
};
