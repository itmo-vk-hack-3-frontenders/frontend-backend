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

const fetchStat = async (): Promise<{ data: Stat[], total: number }> => {
  const { data } = await axios.get("/stats");
  return data;
};

export const ApiService = {
  fetchStat,
  fetchDevices,
};
