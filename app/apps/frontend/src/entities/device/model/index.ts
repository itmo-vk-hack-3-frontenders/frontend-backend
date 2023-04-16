import { createEffect, createEvent, createStore } from "effector";
import { Device } from "../../../shared/api/services/types";
import { ApiService } from "../../../shared";

export const addDevices = createEvent<Device[]>("addDevices");
export const resetDevices = createEvent<void>("resetDevices");

export const fetchDevicesFx = createEffect(async () => {
  const devices = await ApiService.fetchDevices();
  return devices;
});

export const $devices = createStore<Device[]>([])
  .on(fetchDevicesFx.doneData, (_, newDevices) => newDevices)
  .reset(resetDevices);


