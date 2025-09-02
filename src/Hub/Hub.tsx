import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import HomeScreen from "./screens/homeScreen/HomeScreen";
import SpinGame from "../spinGame/SpinGame";
import AskGame from "../askGame/AskGame";
import HubScreen from "./screens/hubScreen/HubScreen";
import JoinScreen from "./screens/joinScreen/JoinScreen";
import Screen from "../common/constants/Screen";
import AdminScreen from "./screens/adminScreen/AdminScreen";
import GameTypeListScreen from "../common/screens/gameTypeListScreen/GameTypeListScreen";
import GameListScreen from "../common/screens/gameListScreen/GameListScreen";
import ProfileScreen from "./screens/profileScreen/ProfileScreen";

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
      <Stack.Screen name={Screen.Profile} component={ProfileScreen} />
      <Stack.Screen name={Screen.Hub} component={HubScreen} />
      <Stack.Screen name={Screen.Join} component={JoinScreen} />
      <Stack.Screen name={Screen.SpinGame} component={SpinGame} />
      <Stack.Screen name={Screen.AskGame} component={AskGame} />
      <Stack.Screen name={Screen.GameList} component={GameListScreen} />
      <Stack.Screen name={Screen.GameTypeList} component={GameTypeListScreen} />
      <Stack.Screen name={Screen.Admin} component={AdminScreen} />
    </Stack.Navigator>
  );
};

export default Hub;
