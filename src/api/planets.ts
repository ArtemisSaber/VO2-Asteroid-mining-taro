import { Planet } from "@/types/types";

import { requestAPI } from "./fetcher";

export const getPlanetsList = async () => {
  try {
    const res = await requestAPI("/planets");
    return res as Array<Planet>;
  } catch (error) {
    console.error(error);
  }
};
