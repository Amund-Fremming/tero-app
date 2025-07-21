import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SpinGame from "../SpinGame/SpinGame";
import AskGame from "../AskGame/AskGame";
import HubScreen from "./screens/HubScreen/HubScreen";
import JoinScreen from "./screens/JoinScreen/JoinScreen";
import Screen from "../Common/constants/Screen";
import AdminScreen from "./screens/AdminScreen/AdminScreen";
import SelectGameScreen from "./screens/SelectGameScreen/SelectGameScreen";

const Stack = createStackNavigator();

export const Hub = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.Home}
      screenOptions={{
        ...TransitionPresets.FadeFromBottomAndroid,
        headerShown: false,
        headerStatusBarHeight: 0,
        cardStyle: { flex: 1 },
      }}
    >
      <Stack.Screen name={Screen.Home} component={HomeScreen} />
      <Stack.Screen name={Screen.Hub} component={HubScreen} />
      <Stack.Screen name={Screen.Join} component={JoinScreen} />
      <Stack.Screen name={Screen.SpinGame} component={SpinGame} />
      <Stack.Screen name={Screen.AskGame} component={AskGame} />
      <Stack.Screen name={Screen.SelectGame} component={SelectGameScreen} />
      <Stack.Screen name={Screen.Admin} component={AdminScreen} />
    </Stack.Navigator>
  );
};

export default Hub;
