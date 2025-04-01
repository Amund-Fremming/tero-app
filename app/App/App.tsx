import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SpinGame from "../Games/SpinGame/SpinGame";
import AskGame from "../Games/AskGame/AskGame";
import HubScreen from "./screens/HubScreen/HubScreen";
import JoinScreen from "./screens/JoinScreen/JoinScreen";
import GamesScreen from "./screens/GamesScreen/GamesScreen";
import Screen from "./assets/constants/Screen";

const Stack = createStackNavigator();

export const App = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.Home}
      screenOptions={{
        ...TransitionPresets.FadeFromBottomAndroid,
        headerShown: false,
      }}
    >
      <Stack.Screen name={Screen.Home} component={HomeScreen} />
      <Stack.Screen name={Screen.Hub} component={HubScreen} />
      <Stack.Screen name={Screen.Join} component={JoinScreen} />
      <Stack.Screen name={Screen.Games} component={GamesScreen} />
      <Stack.Screen name={Screen.SpinGame} component={SpinGame} />
      <Stack.Screen name={Screen.AskGame} component={AskGame} />
    </Stack.Navigator>
  );
};

export default App;
