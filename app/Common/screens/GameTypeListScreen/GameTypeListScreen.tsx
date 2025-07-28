import styles from "./gameTypeListScreenStyles";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import items from "./GameData.json";
import GameTypeCard from "../../components/GameTypeCard/GameTypeCard";
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import VerticalScroll from "../../wrappers/VerticalScroll";
import { verticalScale } from "../../utils/dimensions";

export const GameTypeListScreen = () => {
  return (
    <View style={styles.container}>
      <VerticalScroll key={items?.length ?? 0}>
        <Text style={styles.header}>Velg spill type</Text>
        {items &&
          items.map((item, index) => (
            <GameTypeCard
              key={index}
              header={item.name}
              description={item.description}
              icon={item.icon}
              screen={item.screen}
            />
          ))}
        <View style={{ marginTop: verticalScale(200) }} />
      </VerticalScroll>
      <AbsoluteHomeButton />
    </View>
  );
};

export default GameTypeListScreen;
