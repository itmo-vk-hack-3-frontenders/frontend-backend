import Axios, { AxiosInstance } from "axios";

const host = "http://localhost:3000/api";

const createAxios = (): AxiosInstance => {
  const instance = Axios.create({
    baseURL: host,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export const axios = createAxios();
