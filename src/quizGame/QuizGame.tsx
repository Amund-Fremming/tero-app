import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import LobbyScreen from "./screens/LobbyScreen/LobbyScreen";
import CreateScreen from "../SpinGame/screens/CreateScreen/CreateScreen";
import StartedScreen from "./screens/StartedScreen/StartedScreen";
import { GameScreen } from "./screens/GameScreen/GameScreen";
import { GameEntryMode } from "../Common/constants/Types";
import { SpinGameScreen } from "./constants/spinTypes";
import { useEffect, useState } from "react";

export const QuizGame = () => {
  const [screen, setScreen] = useState<SpinGameScreen>(SpinGameScreen.Lobby);

  useEffect(() => {
    const initScreen = getInitialScreen();
    setScreen(initScreen);
  }, []);

  const { gameEntryMode } = useGlobalGameProvider();

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

export default QuizGame;
