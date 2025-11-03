import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SpinGame from "../spinGame/SpinGame";
import AskGame from "../quizGame/AskGame";
import HubScreen from "./screens/HubScreen/HubScreen";
import JoinScreen from "./screens/JoinScreen/JoinScreen";
import Screen from "../common/constants/screen";
import AdminScreen from "./screens/AdminScreen/AdminScreen";
import GameTypeListScreen from "../common/screens/GameTypeListScreen/GameTypeListScreen";
import GameListScreen from "../common/screens/GameListScreen/GameListScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { SavedGamesScreen } from "./screens/SavedGamesScreen/SavedGamesScreen";

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
      <Stack.Screen name={Screen.SavedGames} component={SavedGamesScreen} />
    </Stack.Navigator>
  );
};

export default Hub;
