import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import { SpinScreen } from "./constants/SpinScreen";
import SpinGameProvider from "./context/SpinGameProvider";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { GameEntryMode } from "@/app/Hub/constants/Types";
import { GameScreen } from "./screens/GameScreen/GameScreen";
import CreateScreen from "./screens/CreateScreen/CreateScreen";
import ChooseScreen from "./screens/ChooseScreen/ChooseScreen";

const Stack = createStackNavigator();

export const SpinGame = () => {
  const { gameEntryMode } = useGlobalGameProvider();

  const getInitialScreen = () => {
    switch (gameEntryMode) {
      case GameEntryMode.Creator:
        return SpinScreen.Create;
      case GameEntryMode.Host:
        return SpinScreen.Choose;
      case GameEntryMode.Participant:
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
        <Stack.Screen name={SpinScreen.Choose} component={ChooseScreen} />
        <Stack.Screen name={SpinScreen.Game} component={GameScreen} />
      </Stack.Navigator>
    </SpinGameProvider>
  );
};

export default SpinGame;
