import { FC, useState } from "react";
import { Headline, Input, Slider } from "@vkontakte/vkui";

export const FilterByDuration: FC = () => {
  const [value, setValue] = useState(24.4234);

  return (
    <div>
      <Headline>
        Фильтр по длительности запроса
      </Headline>
      <Slider max={30} min={10} value={value} onChange={setValue} />
      <Input readOnly value={value} />
    </div>
  );
};
