import { AxiosResponse } from "axios";
import { axios } from "../axios";
import { Device, Stat } from "./types";

const fetchDevices = async (): Promise<AxiosResponse<Device[]> | never> => {
  return await axios.get("/api/stats");
};

const fetchStat = async (): Promise<AxiosResponse<Stat[]> | never> => {
  return await axios.get("/api/stats/devices");
};

export const ApiService = {
  fetchStat,
  fetchDevices,
};
