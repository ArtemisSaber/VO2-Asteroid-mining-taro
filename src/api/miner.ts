import { Miner } from "@/types/types";

import { requestAPI } from "./fetcher";

export const getMinersList = async () => {
  try {
    const res = await requestAPI("/miners");
    return res as Array<Miner>;
  } catch (error) {
    console.error(error);
  }
};
