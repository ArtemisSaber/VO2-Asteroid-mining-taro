import { View, Image, ScrollView } from "@tarojs/components";
import { getStorageSync, setStorage, useLoad, useReady } from "@tarojs/taro";
import NavBar from "@/components/custom-nav";
import IntersectionIcon from "@/assets/images/Intersect.svg";
import {
  getNavBarHeight,
  getPixelRatio,
  getScreenHeight,
  getTabBarHeight,
} from "@/utils/utils";
import GradientCover from "@/components/gradient-cover";
import { getMinersList } from "@/api/miner";
import { useEffect, useState } from "react";
import { planetStore, tabBarStore } from "@/store/stores";
import { planets, tabIndex } from "@/store/atoms";
import { getPlanetsList } from "@/api/planets";
import { Miner, Planet } from "@/types/types";
import { Provider } from "jotai";
import MinerItem from "@/components/miner-item";
import "./index.less";

export default function Index() {
  // const [tabBarIndex, setTabBarIndex] = useAtom(tabIndex);
  const [minersList, setMinersList] = useState(new Array<Miner>());
  const [planetsList, setPlanetsList] = useState(new Array<Planet>());
  useLoad(() => {
    try {
      const cachedMiners = getStorageSync("minersList");
      setMinersList(JSON.parse(cachedMiners));
    } catch (e) {
      console.warn(e);
    }
    try {
      const cachedPlanets = getStorageSync("planetsList");
      setPlanetsList(JSON.parse(cachedPlanets));
    } catch (e) {
      console.warn(e);
    }
    console.log("Page loaded.");
    tabBarStore.set(tabIndex, 0);
    getMinersList().then((res) => {
      console.log("miners list", res);
      if (res) {
        setMinersList(res);
        setStorage({
          key: "minersList",
          data: JSON.stringify(res),
        });
      }
    });
    getPlanetsList().then((res) => {
      if (res) {
        // planetStore.set(planets, res);
        setPlanetsList(res);
        setStorage({
          key: "planetsList",
          data: JSON.stringify(res),
        });
      }
    });
  });
  useEffect(() => {
    console.log("set store");
    planetStore.set(planets, planetsList);
  }, [planetsList]);
  useReady(() => {});
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
        <Provider store={planetStore}>
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
              return <MinerItem miner={miner} key={miner._id}></MinerItem>;
            })}
            <View className="padding-view"></View>
          </ScrollView>
        </Provider>
      </View>
      <View
        style={{ height: `${tabBarHeight * pixelRatio}rpx` }}
        className="tabbar-padding"
      />
    </View>
  );
}
