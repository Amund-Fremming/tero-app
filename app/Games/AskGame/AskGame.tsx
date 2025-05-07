import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import { AskScreen } from "./constants/AskScreen";
import AskGameProvider, { useAskGameProvider } from "./context/AskGameProvider";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import { CreateScreen } from "./screens/CreateScreen/CreateScreen";
import StartedScreen from "./screens/StartedScreen/StartedScreen";
import { GameScreen } from "./screens/GameScreen/GameScreen";
import ChooseScreen from "./screens/ChooseScreen/ChooseScreen";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";
import { HubChannel } from "@/app/Hub/constants/HubChannel";
import { AskGameState } from "./constants/AskTypes";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import Screen from "@/app/Hub/constants/Screen";

const Stack = createStackNavigator();

export const AskGame = ({ navigation }: any) => {
  const { isCreator } = useGlobalGameProvider();
  const { setIterations, gameId } = useAskGameProvider();
  const { connect, connection } = useHubConnectionProvider();
  const { displayErrorModal } = useInfoModalProvider();

  const initialScreen = isCreator ? AskScreen.Create : AskScreen.Choose;

  useEffect(() => {
    var result = connect("AskGame", gameId);
    if (result.isErr()) {
      displayErrorModal("Tilkoblingen feilet, sjekk forbindelsen din.");
      return;
    }

    connection?.on(HubChannel.Iterations, (iterations: number) => {
      console.log(`Received: ${iterations}`); // TODO - remove log
      setIterations(iterations);
    });

    connection?.on(HubChannel.State, (state: AskGameState) => {
      console.log(`Received: ${state}`); // TODO - remove log
      if (state === AskGameState.Closed) {
        navigation.navigate(AskScreen.Started);
      }
    });

    connection?.on(HubChannel.Error, (message: string) => {
      console.log(`Received: ${message}`); // TODO - remove log
      displayErrorModal(message, () => navigation.navigate(Screen.Home));
    });
  }, []);

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
