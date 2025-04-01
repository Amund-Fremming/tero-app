import React from "react";
import { View, Text, Button } from "react-native";

export const AskGame = ({ navigation }: any) => {
  return (
    <View>
      <Text>AskGame</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default AskGame;
