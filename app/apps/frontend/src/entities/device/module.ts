import { createEvent, createStore } from "effector";
import { Device } from "../../shared/api/services/types";

export const addDevices = createEvent<Device[]>("addDevices");
export const resetDevices = createEvent<void>("resetDevices");

export const DevicesStore = createStore<Device[]>([])
  .on(addDevices, (state, newDevices) => [...state, ...newDevices])
  .reset(resetDevices);
