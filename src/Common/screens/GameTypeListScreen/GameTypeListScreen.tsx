import styles from "./gameTypeListScreenStyles";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import data from "./data.json";
import { View, Text, Pressable, ScrollView, Dimensions, Image } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import { GameEntryMode, GameType } from "../../constants/types";
import Screen from "../../constants/screen";
import { verticalScale } from "../../utils/dimensions";
import { Feather } from "@expo/vector-icons";
import Color from "../../constants/color";

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
        <View style={styles.topWrapper}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconWrapper}>
            <Feather name="chevron-left" size={32} color={Color.OffBlack} />
          </Pressable>
          <View>
            <Text style={styles.header}>Velg spill</Text>
            <View style={styles.borderWrapper}>
              <View style={styles.borderLeft} />
              <View style={styles.borderRight} />
            </View>
          </View>
          <Pressable style={styles.iconWrapper}>
            <Text style={styles.icon}>?</Text>
          </Pressable>
        </View>
        {data &&
          data.map((item, index) => (
            <Pressable key={index} style={styles.card} onPress={() => handlePress(item.screen as GameType)}>
              <View style={styles.imagePlaceholder}></View>
              <Text style={styles.cardHeader}>{item.name}</Text>
            </Pressable>
          ))}
        <Pressable key={100} style={styles.card} onPress={() => navigation.navigate(Screen.TipsUs)}>
          <View style={styles.imagePlaceholder}></View>
          <Text style={styles.cardHeader}>Ditt spill?</Text>
          <Text style={styles.cardSubheader}>Send inn forslag til nye spill</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default GameTypeListScreen;
