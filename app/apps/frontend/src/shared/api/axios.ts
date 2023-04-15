import Axios, { AxiosInstance } from "axios";

const createAxios = (): AxiosInstance => {
  const instance = Axios.create({
    baseURL: "https://api.example.com",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export const axios = createAxios();
