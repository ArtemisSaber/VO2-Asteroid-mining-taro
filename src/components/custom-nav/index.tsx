import { ROUTES } from "@/routes/routes";
import { Image, View } from "@tarojs/components";
import {
  useLoad,
  getMenuButtonBoundingClientRect,
  getCurrentPages,
  getSystemInfoSync,
  navigateBack,
  switchTab,
} from "@tarojs/taro";
import { ReactNode, useState } from "react";
import "./index.less";
import HomeIcon from "./assets/Home.svg";
import ArrowIcon from "./assets/arrow-right.svg";

interface NavProps {
  placehold?: "Full" | "StatusBar";
  goBackDelta?: number;
  onTopIcon?: (e: { key: any }) => void;
  children?: ReactNode;
  backgroundColor?: string;
}

const NavBarIcon = {
  Back: {
    key: "back",
    icon: ArrowIcon,
  },
  Home: {
    key: "home",
    icon: HomeIcon,
  },
};

const NavBar = ({
  placehold = "StatusBar",
  goBackDelta = 1,
  onTopIcon = () => {},
  children,
  backgroundColor,
}: NavProps) => {
  const [buttons, setButtons] = useState(Array<any>);
  const [isIOS, setIsIOS] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [leftWidth, setLeftWidth] = useState("");
  useLoad(() => {
    const rect = getMenuButtonBoundingClientRect
      ? getMenuButtonBoundingClientRect()
      : null;
    const pages = getCurrentPages();
    let btns = [] as Array<any>;
    if (pages.length > 1) {
      btns = [NavBarIcon.Back, NavBarIcon.Home];
    } else {
      btns = [];
    }
    const systemInfo = getSystemInfoSync();
    setIsIOS(!!(systemInfo.system.toLowerCase().search("ios") + 1));
    const newStatusBarHeight = systemInfo.statusBarHeight
      ? systemInfo.statusBarHeight
      : 0;
    console.log("new height", newStatusBarHeight);
    setStatusBarHeight(newStatusBarHeight);

    setButtons(btns);
    setLeftWidth(
      `width:${systemInfo.windowWidth - (rect?.left ? rect.left : 0)}px`
    );
  });
  return (
    <>
      <View className="bar" style={{ backgroundColor: backgroundColor }}>
        {(placehold === "Full" || placehold === "StatusBar") && (
          <View
            className={`placeholder ${isIOS ? "ios" : "android"} ${
              placehold === "Full" ? "full" : "statusbar"
            }`}
            style={{
              height: `${
                placehold === "Full"
                  ? `${statusBarHeight + (isIOS ? 45 : 48)}px`
                  : `${statusBarHeight}px`
              }`,
            }}
          />
        )}
        <View className={`inner ${isIOS ? "ios" : "android"}`}>
          <View className="left" style={leftWidth}>
            {buttons.map((btn) => {
              return (
                <View
                  key={btn.key}
                  className="btn-wrapper"
                  onClick={() => {
                    const key = btn.key;
                    if (key === NavBarIcon.Back.key) {
                      // wx.navigateBack({ delta: data.delta });
                      console.log("delta", goBackDelta);
                      navigateBack({
                        delta: goBackDelta,
                      });
                    } else if (key === NavBarIcon.Home.key) {
                      switchTab({
                        url: ROUTES.MINERS,
                      });
                    }
                    onTopIcon({ key });
                  }}
                >
                  <Image
                    mode="aspectFit"
                    src={btn.icon}
                    style={{ height: "48rpx", width: "48rpx" }}
                  />
                </View>
              );
            })}
          </View>
          <View className="center">{children}</View>
        </View>
      </View>
    </>
  );
};

export default NavBar;
