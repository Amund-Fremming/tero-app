import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import AskScreen from "./constants/quizScreen";
import QuizGameProvider from "./context/AskGameProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import CreateScreen from "../spinGame/screens/CreateScreen/CreateScreen";
import StartedScreen from "./screens/StartedScreen/StartedScreen";
import { GameScreen } from "./screens/GameScreen/GameScreen";
import GameListScreen from "../common/screens/GameListScreen/GameListScreen";
import { GameEntryMode } from "../common/constants/types";

const Stack = createStackNavigator();

export const QuizGame = () => {
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
    <QuizGameProvider>
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
    </QuizGameProvider>
  );
};

export default QuizGame;
