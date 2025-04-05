import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import { SpinScreen } from "./constants/SpinScreen";
import GameStateProvider from "./context/GameStateProvider";

var Stack = createStackNavigator();

export const SpinGame = () => {
  return (
    <GameStateProvider>
      <Stack.Navigator
        initialRouteName={SpinScreen.Lobby}
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid,
          headerShown: false,
          headerStatusBarHeight: 0,
        }}
      >
        <Stack.Screen name={SpinScreen.Lobby} component={LobbyScreen} />
      </Stack.Navigator>
    </GameStateProvider>
  );
};

export default SpinGame;
