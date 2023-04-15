import Axios, { AxiosInstance } from "axios";

const host = "http://172.30.109.64:4200/";

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
