import { axios } from "../axios";
import { Device, Stat } from "./types";

const fetchDevices = async (): Promise<Device[]> => {
  try {
    const response = await axios.get("/api/stats");
    return response.data;
  } catch (error) {
    return [];
  }
};

const fetchStat = async (): Promise<Stat[]> => {
  try {
    const response = await axios.get("/api/stats/devices");
    return response.data;
  } catch (error) {
    return [];
  }
};

export {
  fetchStat,
  fetchDevices,
};
