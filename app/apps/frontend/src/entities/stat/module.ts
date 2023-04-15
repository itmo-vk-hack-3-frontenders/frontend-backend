import { createEvent, createStore } from "effector";
import { Stat } from "../../shared/api/services/types";

export const addStats = createEvent<Stat[]>("addStats");
export const resetStats = createEvent<void>("resetStats");

export const statsStore = createStore<Stat[]>([])
  .on(addStats, (state, newStats) => [...state, ...newStats])
  .reset(resetStats);
