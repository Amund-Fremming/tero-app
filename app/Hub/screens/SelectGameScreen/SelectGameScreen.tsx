import styles from "./selectGameScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../constants/Screen";
import Colors from "../../constants/Color";
import items from "./GameData.json";
import GameCard from "../../components/GameCard/GameCard";
import { View, Text, ScrollView } from "react-native";
import React from "react";
import { verticalScale } from "../../utils/dimensions";

export const SelectGameScreen = () => {
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          gap: verticalScale(10),
        }}
      >
        <View style={styles.leadContainer}>
          <Text style={styles.header}>Velg spill type</Text>
        </View>

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

        <AbsoluteNavButton
          label="Hjem"
          destination={Screen.Home}
          primary={Colors.White}
          secondary={Colors.Red}
        />
      </ScrollView>
    </>
  );
};

export default SelectGameScreen;
