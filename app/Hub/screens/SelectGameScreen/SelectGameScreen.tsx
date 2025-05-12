import styles from "./selectGameScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../constants/Screen";
import Colors from "../../constants/Color";
import items from "./GameData.json";
import GameCard from "../../components/GameCard/GameCard";
import { View, Text } from "react-native";
import React from "react";
import VerticalScroll from "../../wrappers/VerticalScroll";

export const SelectGameScreen = () => {
  return (
    <View style={styles.container}>
      <VerticalScroll>
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
      </VerticalScroll>
      <AbsoluteNavButton label="Hjem" destination={Screen.Home} primary={Colors.White} secondary={Colors.Red} />
    </View>
  );
};

export default SelectGameScreen;
