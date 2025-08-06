import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React, { useEffect } from "react";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import { SpinScreen } from "./constants/SpinScreen";
import SpinGameProvider from "./context/SpinGameProvider";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import { GameEntryMode } from "@/src/Common/constants/Types";
import { GameScreen } from "./screens/GameScreen/GameScreen";
import CreateScreen from "./screens/CreateScreen/CreateScreen";
import GameListScreen from "../Common/screens/GameListScreen/GameListScreen";

const Stack = createStackNavigator();

export const SpinGame = () => {
  const { universalGameValues, gameEntryMode } = useGlobalGameProvider();

  useEffect(() => {}, [universalGameValues]);

  const getInitialScreen = () => {
    console.log("OB", universalGameValues);

    switch (gameEntryMode) {
      case GameEntryMode.Creator:
        return SpinScreen.Create;
      case GameEntryMode.Host:
        return SpinScreen.Choose;
      case GameEntryMode.Participant || GameEntryMode.Member:
        return SpinScreen.Lobby;
    }
  };

  return (
    <SpinGameProvider>
      <Stack.Navigator
        initialRouteName={getInitialScreen()}
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid,
          headerShown: false,
          headerStatusBarHeight: 0,
        }}
      >
        <Stack.Screen name={SpinScreen.Lobby} component={LobbyScreen} />
        <Stack.Screen name={SpinScreen.Create} component={CreateScreen} />
        <Stack.Screen name={SpinScreen.Game} component={GameScreen} />
        <Stack.Screen name={SpinScreen.Choose} component={GameListScreen} />
      </Stack.Navigator>
    </SpinGameProvider>
  );
};

export default SpinGame;
