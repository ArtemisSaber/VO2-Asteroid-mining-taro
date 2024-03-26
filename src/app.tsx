import { PropsWithChildren } from "react";
import { useLaunch, loadFontFace, connectSocket } from "@tarojs/taro";
import { Provider } from "jotai";
import { View } from "@tarojs/components";

import "./app.less";
import { dataStore } from "./store/stores";
import { WS_URL } from "./config";
import { EventData } from "./types/types";
import { asteroids, miners, planets, tick } from "./store/atoms";
import { getMinersList } from "./api/miner";
import { getPlanetsList } from "./api/planets";

function App({ children }: PropsWithChildren<any>) {
  const storage = dataStore;
  useLaunch(() => {
    console.log("App launched.");
    loadFontFace({
      global: true,
      family: "Jost",
      source:
        "https://git.mediasia.cn/mediasia-interactive/taro-test/-/raw/main/ASSETS/FONT/Jost/Jost-VariableFont_wght.ttf",
    });
    const socket = connectSocket({
      url: WS_URL,
    });
    socket.then((task) => {
      setInterval(() => {
        task.send({
          data: "ping",
        });
      }, 5000);
      task.onMessage((res) => {
        console.log("message res is", res);
        const eventData = JSON.parse(res.data) as EventData;
        if (eventData.args.length > 0) {
          const {
            currentTick,
            miners: minerList,
            asteroids: asteroidList,
            planets: planetList,
          } = eventData.args[0];
          storage.set(tick, currentTick);
          storage.set(miners, minerList);
          storage.set(asteroids, asteroidList);
          storage.set(planets, planetList);
        }
      });
      task.onError((err) => {
        console.warn("socket error", err.errMsg);
        task.close({
          reason: err.errMsg,
        });
      });
    });
    getMinersList().then((res) => {
      if (res) {
        storage.set(miners, res);
      }
    });
    getPlanetsList().then((res) => {
      if (res) {
        storage.set(planets, res);
      }
    });
  });

  // children 是将要会渲染的页面
  return (
    <Provider store={storage}>
      <View className="app">{children}</View>
    </Provider>
  );
}

export default App;
