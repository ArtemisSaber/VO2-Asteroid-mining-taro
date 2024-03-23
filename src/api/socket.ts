import { BASE_URL } from "@/config";
import Taro from "@tarojs/taro";

export const socket = Taro.connectSocket({
  url: BASE_URL,
  header: {
    "content-type": "application/json",
  },
});
