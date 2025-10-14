import styles from "./gameTypeListScreenStyles";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import items from "./GameData.json";
import { View, Text, Pressable } from "react-native";
import React from "react";
import VerticalScroll from "../../wrappers/VerticalScroll";
import { verticalScale } from "../../utils/dimensions";
import { useNavigation } from "expo-router";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import { useModalProvider } from "../../context/ModalProvider";
import { GameEntryMode, GameType } from "../../constants/types";
import Screen from "../../constants/screen";

export const GameTypeListScreen = () => {
  const navigation: any = useNavigation();
  const { setGameType, gameEntryMode } = useGlobalGameProvider();

  const handlePress = (screen: GameType) => {
    const creating = gameEntryMode === GameEntryMode.Creator;
    setGameType(screen);
    navigation.navigate(creating ? screen : Screen.GameList);
  };

  return (
    <View style={styles.container}>
      <VerticalScroll key={items?.length ?? 0}>
        <Text style={styles.header}>Velg spill type</Text>
        {items &&
          items.map((item, index) => (
            <Pressable key={index} style={styles.card} onPress={() => handlePress(item.screen as GameType)}>
              <Text style={styles.cardHeader}>{item.name}</Text>
              <Text style={styles.paragraph}>{item.description}</Text>
            </Pressable>
          ))}
      </VerticalScroll>
      <AbsoluteHomeButton />
    </View>
  );
};

export default GameTypeListScreen;
