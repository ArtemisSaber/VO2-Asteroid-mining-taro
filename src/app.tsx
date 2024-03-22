import { PropsWithChildren } from "react";
import { useLaunch, loadFontFace } from "@tarojs/taro";
import { Provider } from "jotai";
import { View } from "@tarojs/components";

import "./app.less";
import { tabBarStore } from "./store/stores";

function App({ children }: PropsWithChildren<any>) {
  const storage = tabBarStore;
  useLaunch(() => {
    console.log("App launched.");
    loadFontFace({
      global: true,
      family: "Jost",
      source:
        "https://git.mediasia.cn/mediasia-interactive/taro-test/-/raw/main/ASSETS/FONT/Jost/Jost-VariableFont_wght.ttf",
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
