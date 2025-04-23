import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import { AskScreen } from "./constants/AskScreen";
import AskGameProvider from "./context/AskGameProvider";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import { CreateScreen } from "./screens/CreateScreen/CreateScreen";
import StartedScreen from "./screens/StartedScreen/StartedScreen";
import { GameScreen } from "./screens/GameScreen/GameScreen";
import ChooseScreen from "./screens/ChooseScreen/ChooseScreen";

const Stack = createStackNavigator();

export const AskGame = () => {
  const { isCreator } = useGlobalGameProvider();
  const initialScreen = isCreator ? AskScreen.Create : AskScreen.Choose;

  return (
    <AskGameProvider>
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid,
          headerShown: false,
          headerStatusBarHeight: 0,
        }}
      >
        <Stack.Screen name={AskScreen.Lobby} component={LobbyScreen} />
        <Stack.Screen name={AskScreen.Create} component={CreateScreen} />
        <Stack.Screen name={AskScreen.Started} component={StartedScreen} />
        <Stack.Screen name={AskScreen.Game} component={GameScreen} />
        <Stack.Screen name={AskScreen.Choose} component={ChooseScreen} />
      </Stack.Navigator>
    </AskGameProvider>
  );
};

export default AskGame;
