import Taro from "@tarojs/taro";

export const systemInfo = Taro.getSystemInfoSync();

export const isDeviceX = (): boolean => {
  let isX = false;
  const { system, statusBarHeight } = systemInfo;
  isX =
    system.toLowerCase().indexOf("ios") >= 0 &&
    typeof statusBarHeight == "number" &&
    statusBarHeight > 35;
  return isX;
};

export const getNavBarHeight = (): number => {
  const { system, statusBarHeight } = systemInfo;
  const ios = system && system.toLowerCase().indexOf("ios") >= 0;
  return (statusBarHeight || 0) + (ios ? 44 : 48);
};

export const getTabBarPadding = (): number => {
  const isX = isDeviceX();
  return isX ? 20 : 5;
};

export const getTabBarHeight = (): number => {
  const padding = getTabBarPadding();
  return padding + 80;
};

export const getPixelRatio = (): number => {
  const { windowWidth } = systemInfo;
  return 750 / windowWidth;
};

export const getScreenHeight = (): number => {
  const { windowHeight } = systemInfo;
  return windowHeight;
};

export const getItemById = <T extends { _id: string }>(
  id: string,
  arr: Array<T>
): T | undefined => {
  return arr.find((item) => item._id === id);
};

export enum TransitStatus {
  "Idle" = 0,
  "Travelling" = 1,
  "Mining" = 2,
  "Transferring" = 3,
}
