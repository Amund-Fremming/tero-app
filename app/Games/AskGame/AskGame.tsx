import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import FinishedScreen from "./screens/FinishedScreen/FinishedScreen";
import { AskScreen } from "./constants/AskScreen";
import GameStateProvider from "./context/GameStateProvider";

const Stack = createStackNavigator();

export const AskGame = () => {
  return (
    <GameStateProvider>
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
    </GameStateProvider>
  );
};

export default AskGame;
