import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React from "react";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import { SpinScreen } from "./constants/SpinScreen";
import SpinGameProvider from "./context/SpinGameProvider";

const Stack = createStackNavigator();

export const SpinGame = () => {
  return (
    <SpinGameProvider>
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
    </SpinGameProvider>
  );
};

export default SpinGame;
