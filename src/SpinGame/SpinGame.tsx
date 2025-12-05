import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import { GameEntryMode } from "../Common/constants/Types";
import { SpinGameScreen } from "../quizGame/constants/spinTypes";
import CreateScreen from "./screens/CreateScreen/CreateScreen";
import { GameScreen } from "./screens/GameScreen/GameScreen";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import StartedScreen from "./screens/StartedScreen/StartedScreen";

const Stack = createStackNavigator();

export const SpinGame = () => {
  const { gameEntryMode } = useGlobalGameProvider();

  const [screen, setScreen] = useState<SpinGameScreen>(() => getInitialScreen());

  const getInitialScreen = (): SpinGameScreen => {
    switch (gameEntryMode) {
      case GameEntryMode.Creator:
        return SpinGameScreen.Create;
      case GameEntryMode.Host:
        return SpinGameScreen.Game;
      case GameEntryMode.Participant || GameEntryMode.Member:
        return SpinGameScreen.Lobby;
      default:
        return SpinGameScreen.Lobby;
    }
  };

  useEffect(() => {}, []);

  switch (screen) {
    case SpinGameScreen.Create:
      return <CreateScreen />;
    case SpinGameScreen.Game:
      return <GameScreen />;
    case SpinGameScreen.Lobby:
      return <LobbyScreen />;
    case SpinGameScreen.Started:
      return <StartedScreen />;
    default:
      return SpinGameScreen.Lobby;
  }
};

export default SpinGame;
