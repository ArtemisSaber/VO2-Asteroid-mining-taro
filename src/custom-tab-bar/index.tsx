import { useLoad, useReady, useUnload } from "@tarojs/taro";
import { dataStore } from "@/store/stores";
import { tabIndex } from "@/store/atoms";
import { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { getTabBarPadding } from "@/utils/utils";
import { TABS } from "@/config";
import GradientCover from "@/components/gradient-cover";
import "./index.less";

const CustomTabBar = () => {
  const [index, setIndex] = useState(dataStore.get(tabIndex));
  const paddingHeight = getTabBarPadding();
  const unSub = dataStore.sub(tabIndex, () => {
    const newIndex = dataStore.get(tabIndex);
    setIndex(newIndex);
  });
  useEffect(() => {
    console.log("index has changed to", index);
  }, [index]);
  useLoad(() => {
    console.log("index is", index);
  });
  useReady(() => {});
  useUnload(() => {
    unSub();
  });
  return (
    <>
      <View style={{ marginBottom: "-2rpx" }}>
        <GradientCover angle={0} />
      </View>
      <View
        className="tabbar-container"
        style={{ paddingBottom: `${paddingHeight}px` }}
      >
        {TABS.map((tabPage, i) => {
          return (
            <View
              className={`tab-item ${i === index ? "active" : "inactive"}`}
              key={tabPage.route}
            >
              <Image
                src={i === index ? tabPage.icon.active : tabPage.icon.inactive}
                style={{ height: "30px", width: "30px" }}
              />
              <Text>{tabPage.title}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default CustomTabBar;
