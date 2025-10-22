import styles from "./gameTypeListScreenStyles";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import data from "./data.json";
import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import React from "react";
import VerticalScroll from "../../wrappers/VerticalScroll";
import { useNavigation } from "expo-router";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import { GameEntryMode, GameType } from "../../constants/types";
import Screen from "../../constants/screen";
import { verticalScale } from "../../utils/dimensions";

const { height } = Dimensions.get("window");

export const GameTypeListScreen = () => {
  const navigation: any = useNavigation();
  const { setGameType, gameEntryMode } = useGlobalGameProvider();

  const handlePress = (screen: GameType) => {
    console.log("SCREEN: ", screen);
    const creating = gameEntryMode === GameEntryMode.Creator;
    setGameType(screen);
    navigation.navigate(creating ? screen : Screen.GameList);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          height: height,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          gap: verticalScale(15),
          paddingBottom: verticalScale(200),
        }}
      >
        <Text style={styles.header}>Velg spill type</Text>
        {data &&
          data.map((item, index) => (
            <Pressable key={index} style={styles.card} onPress={() => handlePress(item.screen as GameType)}>
              <Text style={styles.cardHeader}>{item.name}</Text>
              <Text style={styles.paragraph}>{item.description}</Text>
            </Pressable>
          ))}
      </ScrollView>
      <AbsoluteHomeButton />
    </View>
  );
};

export default GameTypeListScreen;
