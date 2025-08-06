import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import { AskScreen } from "./constants/AskScreen";
import AskGameProvider from "./context/AskGameProvider";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import { CreateScreen } from "./screens/CreateScreen/CreateScreen";
import StartedScreen from "./screens/StartedScreen/StartedScreen";
import { GameScreen } from "./screens/GameScreen/GameScreen";
import GameListScreen from "../Common/screens/GameListScreen/GameListScreen";
import { GameEntryMode } from "@/src/Common/constants/Types";

const Stack = createStackNavigator();

export const AskGame = () => {
  const { gameEntryMode } = useGlobalGameProvider();

  const getInitialScreen = () => {
    switch (gameEntryMode) {
      case GameEntryMode.Creator:
        return AskScreen.Create;
      case GameEntryMode.Host:
        return AskScreen.Choose;
      case GameEntryMode.Participant:
        return AskScreen.Lobby;
    }
  };

  return (
    <AskGameProvider>
      <Stack.Navigator
        initialRouteName={getInitialScreen()}
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
        <Stack.Screen name={AskScreen.Choose} component={GameListScreen} />
      </Stack.Navigator>
    </AskGameProvider>
  );
};

export default AskGame;
