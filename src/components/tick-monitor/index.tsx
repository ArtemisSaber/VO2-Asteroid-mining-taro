import { tick } from "@/store/atoms";
import { dataStore } from "@/store/stores";
import { View } from "@tarojs/components";
import { useUnload } from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./index.less";

const TickMonitor = () => {
  const [tickCount, setTickCount] = useState(1);
  const [sub, setSub] = useState([] as Array<() => void>);
  useEffect(() => {
    const subscription = dataStore.sub(tick, () => {
      const newTick = dataStore.get(tick);
      setTickCount(newTick);
    });
    setSub([subscription]);
  }, []);
  useUnload(() => {
    sub.forEach((subscription) => {
      subscription();
    });
  });
  return (
    <View className="tick">
      <View className="tick-text">{tickCount}</View>
      <View className="tick-text">{tickCount > 1 ? "YEARS" : "YEAR"}</View>
    </View>
  );
};

export default TickMonitor;
