import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import LobbyScreen from "../SpinGame/screens/LobbyScreen/LobbyScreen";
import FinishedScreen from "../SpinGame/screens/FinishedScreen/FinishedScreen";
import { AskScreen } from "./constants/AskScreen";
import AskGameProvider from "./context/AskGameProvider";

const Stack = createStackNavigator();

export const AskGame = () => {
  return (
    <AskGameProvider>
      <Stack.Navigator
        initialRouteName={AskScreen.Lobby}
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid,
          headerShown: false,
          headerStatusBarHeight: 0,
        }}
      >
        <Stack.Screen name={AskScreen.Lobby} component={LobbyScreen} />
        <Stack.Screen name={AskScreen.Finished} component={FinishedScreen} />
      </Stack.Navigator>
    </AskGameProvider>
  );
};

export default AskGame;
