import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SpinGame from "../Games/SpinGame/SpinGame";
import AskGame from "../Games/AskGame/AskGame";

const Stack = createStackNavigator();

export const App = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...TransitionPresets.FadeFromBottomAndroid,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SpinGame" component={SpinGame} />
      <Stack.Screen name="AskGame" component={AskGame} />
    </Stack.Navigator>
  );
};

export default App;
