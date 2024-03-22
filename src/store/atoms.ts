import { Planet } from "@/types/types";
import { atom } from "jotai";

export const tabIndex = atom(0);

export const planets = atom(new Array<Planet>());
