import { View, Text } from "@tarojs/components";
import { useLoad, useReady } from "@tarojs/taro";
import { useAtom } from "jotai";
import { tabIndex } from "@/store/atoms";
import "./index.less";

export default function Index() {
  const [tabBarIndex, setTabBarIndex] = useAtom(tabIndex);
  useLoad(() => {
    console.log("current index", tabBarIndex);
    console.log("Page loaded.");
    setTabBarIndex(1);
  });
  useReady(() => {
    console.log("new index", tabBarIndex);
  });

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  );
}
