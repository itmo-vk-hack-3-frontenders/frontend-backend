import { FC } from "react";
import { AppLayout } from "../../widgets";
import { LineChart } from "../../shared/uikit/LineChart";
import { FilterSelect } from "../../features";


const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const list = [
  {
    label: "fsdfds",
    value: "dsfsdf",
  },
  {
    label: "fs34s",
    value: "dsdsfdfsdf",
  },
];

export const HomePage: FC = () => {
  return (
    <AppLayout>
      <FilterSelect options={list} placeholder="Версия os" />
      <LineChart data={data} options={options} />
    </AppLayout>
  );
};
