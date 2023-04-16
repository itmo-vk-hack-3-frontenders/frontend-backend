import { axios } from "../axios";
import { Device, Stat } from "./types";

const stats = Array.from({ length: 20 }, (_, index) => ({
  deviceId: `device${index % 3}`, // Repeat device ids three times
  url: `https://example.com/${index}`,
  method: index % 2 === 0 ? "GET" : "POST",
  statusCode: 200 + index % 3,
  date: Date.now() - (index % 7) * 1000 * 60 * 60 * 24, // Vary date between 0 and 6 days
  duration: 500 + index * 10,
  size: 1024 + index * 100,
  locationOfRequest: `file${index}.js`,
}));

// Generate an array of 20 Device objects with some properties varying and some repeating
const devices = Array.from({ length: 20 }, (_, index) => ({
  buildVersion: "1.0.0",
  os: index % 2 === 0 ? "iOS" : "Android",
  deviceId: `device${index % 3}`, // Repeat device ids three times
  osVersion: `14.${index % 3}`,
}));

const fetchDevices = async (): Promise<Device[]> => {
  try {
    const { data } = await axios.get("/stats");
    return data;
  } catch (error) {
    return [];
  }
};

const fetchStat = async (): Promise<Stat[]> => {
  try {
    const { data } = await axios.get("/api/stats/devices");
    return data;
  } catch (error) {
    return [];
  }
};

export const ApiService = {
  fetchStat,
  fetchDevices,
};
