import { View, Image, ScrollView } from "@tarojs/components";
import {
  getStorageSync,
  setStorageSync,
  useLoad,
  useReady,
  useUnload,
} from "@tarojs/taro";
import NavBar from "@/components/custom-nav";
import IntersectionIcon from "@/assets/images/Intersect.svg";
import {
  getNavBarHeight,
  getPixelRatio,
  getScreenHeight,
  getTabBarHeight,
} from "@/utils/utils";
import GradientCover from "@/components/gradient-cover";
import { useState } from "react";
import { dataStore } from "@/store/stores";
import { miners, planets, tabIndex } from "@/store/atoms";
import { Miner, Planet } from "@/types/types";
import MinerItem from "@/components/miner-item";
import TickMonitor from "@/components/tick-monitor";
import "./index.less";

export default function Index() {
  // const [tabBarIndex, setTabBarIndex] = useAtom(tabIndex);
  const [minersList, setMinersList] = useState(new Array<Miner>());
  const [planetsList, setPlanetsList] = useState(new Array<Planet>());
  const [subscriptions, setSubscriptions] = useState([] as Array<() => void>);
  useLoad(() => {
    try {
      const cachedMiners = getStorageSync("minersList");
      setMinersList(JSON.parse(cachedMiners));
    } catch (e) {
      console.warn(e);
    }
    console.log("Page loaded.");
    dataStore.set(tabIndex, 0);
    const unSubMiners = dataStore.sub(miners, () => {
      const newMiners = dataStore.get(miners);
      setMinersList(newMiners);
      setStorageSync("minersList", JSON.stringify(newMiners));
    });
    const unSubPlanets = dataStore.sub(planets, () => {
      const newPlanets = dataStore.get(planets);
      console.log("new planets", newPlanets);
      setPlanetsList(newPlanets);
    });
    subscriptions.push(unSubMiners);
    subscriptions.push(unSubPlanets);
    setSubscriptions(subscriptions);
  });
  useReady(() => {});
  useUnload(() => {
    subscriptions.forEach((sub) => {
      sub();
    });
  });
  const navBarHeight = getNavBarHeight();
  const tabBarHeight = getTabBarHeight();
  const pixelRatio = getPixelRatio();
  const screenHeight = getScreenHeight();
  return (
    <View className="index">
      <View
        style={{ height: `${navBarHeight * pixelRatio + 2}rpx` }}
        className="nav-padding"
      />
      <NavBar placehold="StatusBar">
        <Image
          src={IntersectionIcon}
          mode="aspectFill"
          style={{ width: "48rpx", height: "48rpx" }}
        />
      </NavBar>
      <View className="miner-list-container">
        <View
          className="gradient-cover-container"
          style={{ top: `${navBarHeight * pixelRatio}rpx` }}
        >
          <GradientCover angle={180} />
        </View>
        <View
          className="tick-counter-container"
          style={{ top: `${navBarHeight * pixelRatio + 16 * pixelRatio}rpx` }}
        >
          <TickMonitor />
        </View>
        <ScrollView
          className="miner-list"
          scrollY
          enhanced
          showScrollbar={false}
          style={{
            height: `${
              (screenHeight - navBarHeight - tabBarHeight) * pixelRatio
            }rpx`,
          }}
        >
          <View className="padding-view"></View>
          {minersList.map((miner) => {
            return (
              <MinerItem
                miner={miner}
                key={miner._id}
                planetsList={planetsList}
              ></MinerItem>
            );
          })}
          <View className="padding-view"></View>
        </ScrollView>
      </View>
      <View
        style={{ height: `${tabBarHeight * pixelRatio}rpx` }}
        className="tabbar-padding"
      />
    </View>
  );
}
