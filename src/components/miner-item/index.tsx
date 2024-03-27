import { Miner, Planet } from "@/types/types";
import { View } from "@tarojs/components";
import { getItemById, TransitStatus } from "@/utils/utils";
import { useMemo } from "react";
import "./index.less";

interface MinerItemProps {
  miner: Miner;
  planetsList: Array<Planet>;
}

const MinerItem = ({ miner, planetsList }: MinerItemProps) => {
  const minerPlanet = useMemo(() => {
    console.log("planets", planetsList, "miner", miner);
    if (typeof miner.planet === "string") {
      return getItemById(miner.planet, planetsList);
    } else {
      return miner.planet;
    }
  }, [miner, planetsList]);

  return (
    <View className="miner-item-container">
      <View className="miner-transit-status">
        <View className="miner-planet">
          {minerPlanet ? minerPlanet.name : ""}
        </View>
        <View className="miner-name">{miner.name}</View>
        <View className="miner-status">{TransitStatus[miner.status]}</View>
      </View>
      <View className="miner-stat">
        <View className="miner-stat-item">
          <View className="stat-title">Carry Capacity</View>
          <View
            className={`stat-content ${
              miner.minerals >= miner.carryCapacity ? "full" : ""
            }`}
          >
            {miner.minerals}/{miner.carryCapacity}
          </View>
        </View>
        <View className="miner-stat-item">
          <View className="stat-title">Travel Speed</View>
          <View className="stat-content">{miner.travelSpeed}</View>
        </View>
        <View className="miner-stat-item">
          <View className="stat-title">Position</View>
          <View className="stat-content">
            {miner.x.toFixed(0)},{miner.y.toFixed(0)}
          </View>
        </View>
      </View>

      {/* <Text>{correspondingPlanet ? correspondingPlanet.name : ""}</Text>
      <Text>{miner.name}</Text>
      <Text>
        {miner.minerals}/{miner.carryCapacity}
      </Text>
      <Text>{miner.travelSpeed}</Text>
      <Text>
        {miner.x.toFixed(0)},{miner.y.toFixed(0)}
      </Text> */}
    </View>
  );
};

export default MinerItem;
