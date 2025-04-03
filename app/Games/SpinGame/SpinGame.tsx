import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import { SpinScreen } from "./assets/SpinScreen";

var Stack = createStackNavigator();

export const SpinGame = ({ navigation }: any) => {
  return (
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
  );
};

export default SpinGame;
