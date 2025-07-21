import styles from "./selectGameScreenStyles";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import items from "./GameData.json";
import GameCard from "../../components/GameCard/GameCard";
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import VerticalScroll from "../../wrappers/VerticalScroll";
import { verticalScale } from "../../../Common/utils/dimensions";

export const SelectGameScreen = () => {
  return (
    <View style={styles.container}>
      <VerticalScroll key={items?.length ?? 0}>
        <Text style={styles.header}>Velg spill type</Text>
        {items &&
          items.map((item, index) => (
            <GameCard
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

export default SelectGameScreen;
