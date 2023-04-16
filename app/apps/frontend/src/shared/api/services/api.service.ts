import { axios } from "../axios";
import { Device, Stat } from "./types";

const fetchDevices = async (): Promise<Device[]> => {
  try {
    const { data } = await axios.get("/stats/devices");
    return data;
  } catch (error) {
    return [];
  }
};

const fetchStat = async (): Promise<Stat[]> => {
  try {
    const { data } = await axios.get("/stats");
    return data;
  } catch (error) {
    return [];
  }
};

export const ApiService = {
  fetchStat,
  fetchDevices,
};
