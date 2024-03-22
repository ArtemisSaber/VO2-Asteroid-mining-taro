import { planets } from "@/store/atoms";
import { planetStore } from "@/store/stores";
import { Miner, Planet } from "@/types/types";
import { getItemById } from "@/utils/utils";
import { View, Text } from "@tarojs/components";
import { useUnload } from "@tarojs/taro";
import { useMemo, useState } from "react";

import "./index.less";

interface MinerItemProps {
  miner: Miner;
}

const MinerItem = ({ miner }: MinerItemProps) => {
  const [planetsList, setPlanetsList] = useState(new Array<Planet>());
  const unSub = planetStore.sub(planets, () => {
    const values = planetStore.get(planets);
    setPlanetsList(values);
  });
  useUnload(() => {
    unSub();
  });

  const correspondingPlanet = useMemo(() => {
    return getItemById(miner.planet, planetsList);
  }, [planetsList, miner]);

  return (
    <View className="miner-item-container">
      <Text>{correspondingPlanet ? correspondingPlanet.name : ""}</Text>
    </View>
  );
};

export default MinerItem;
