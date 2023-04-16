import { createEffect, createEvent, createStore } from "effector";
import { Stat } from "../../../shared";
import { ApiService } from "../../../shared";

export const resetStats = createEvent<void>("resetStats");
export const applyDurationFilter = createEvent<number>();
export const applyMethodFilter = createEvent<string>();
export const applyOsFilter = createEvent<string>();

export const applyDateFilter = createEvent<{
  start: Date,
  end: Date,
}>();

export const fetchStatsFx = createEffect(async () => {
  const stats = await ApiService.fetchStat();
  return stats;
});

export const $totalPages = createStore<number>(1)
  .on(fetchStatsFx.doneData, (_, newStats) => Math.ceil(newStats.total / 10));

export const $stats = createStore<Stat[]>([])
  .on(fetchStatsFx.doneData, (_, newStats) => newStats.data)
  .on(applyDurationFilter, (state, length) => {
    return [...state].filter(i => i.duration >= length);
  })
  .on(applyMethodFilter, (state, method) => {
    return [...state].filter(i => i.method === method);
  })
  .on(applyOsFilter, (state, os) => {
    return [...state].filter(i => i.device.os === os);
  })
  .on(applyDateFilter, (state, dates) => {
    return [...state].filter(i => new Date(i.date) >= dates.start && new Date(i.date) <= dates.end);
  })
  .reset(resetStats);
