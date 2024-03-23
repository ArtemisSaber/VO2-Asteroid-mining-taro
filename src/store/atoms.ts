import { Asteroid, Miner, Planet } from "@/types/types";
import { atom } from "jotai";

export const tabIndex = atom(0);

export const planets = atom(new Array<Planet>());

export const miners = atom(new Array<Miner>());

export const asteroids = atom(new Array<Asteroid>());

export const tick = atom(0);
