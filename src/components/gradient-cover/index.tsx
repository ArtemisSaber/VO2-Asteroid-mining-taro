import { View } from "@tarojs/components";
import { ReactNode } from "react";

import "./index.less";

interface GradientCoverProps {
  angle?: number; // gradient angle in degrees
  children?: ReactNode; // in case you need to place stuff above gradient
}

const GradientCover = ({ angle = 0, children }: GradientCoverProps) => {
  return (
    <View
      className="gradient-cover"
      style={{
        background: `linear-gradient(${angle}deg, rgba(13,2,22,1) 0%,rgba(13,2,22,1) 30%, rgba(13,2,22,0) 100%)`,
        height: `48px`,
      }}
    >
      {children}
    </View>
  );
};

export default GradientCover;
