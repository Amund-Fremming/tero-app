import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React, { useEffect } from "react";
import LobbyScreen from "./screens/lobbyScreen/LobbyScreen";
import { SpinScreen } from "./constants/spinScreen";
import SpinGameProvider from "./context/SpinGameProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import { GameEntryMode } from "@/src/common/constants/Types";
import { GameScreen } from "./screens/gameScreen/GameScreen";
import CreateScreen from "./screens/createScreen/CreateScreen";
import GameListScreen from "../common/screens/gameListScreen/GameListScreen";

const Stack = createStackNavigator();

export const SpinGame = () => {
  const { universalGameValues, gameEntryMode } = useGlobalGameProvider();

  useEffect(() => { }, [universalGameValues]);

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
