export default defineAppConfig({
  pages: ["pages/miners/index", "pages/asteroids/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  tabBar: {
    custom: true,
    color: "#FFF",
    selectedColor: "#000",
    backgroundColor: "#F6F7F8",
    list: [
      {
        pagePath: "pages/miners/index",
        text: "Miners",
      },
      {
        pagePath: "pages/asteroids/index",
        text: "Miners",
      },
    ],
  },
});
