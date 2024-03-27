import { History } from "@/types/types";
import { requestAPI } from "./fetcher";

export const getHistoryByMinerId = async (id: string) => {
  try {
    const res = await requestAPI(`/history?minerId=${id}`);
    return res as Array<History>;
  } catch (error) {
    console.error(error);
  }
};

export const getAllHistory = async () => {
  try {
    const res = await requestAPI(`/history`);
    return res as Array<History>;
  } catch (error) {
    console.error(error);
  }
};
