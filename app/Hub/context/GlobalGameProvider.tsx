import React, { createContext, ReactNode, useContext, useState } from "react";
import { GameEntryMode, GameType } from "../constants/Types";

interface IGlobalGameContext {
  clearValues: () => void;
  gameId: number | undefined;
  setGameId: React.Dispatch<React.SetStateAction<number | undefined>>;
  universalGameId: number | undefined;
  setUniversalGameId: React.Dispatch<React.SetStateAction<number | undefined>>;
  gameType: GameType;
  setGameType: React.Dispatch<React.SetStateAction<GameType>>;
  gameEntryMode: GameEntryMode;
  setGameEntryMode: React.Dispatch<React.SetStateAction<GameEntryMode>>;
}

const defaultContextValue: IGlobalGameContext = {
  clearValues: () => {},
  gameId: undefined,
  setGameId: () => {},
  universalGameId: undefined,
  setUniversalGameId: () => {},
  gameType: GameType.AskGame,
  setGameType: () => {},
  gameEntryMode: GameEntryMode.Participant,
  setGameEntryMode: () => {},
};

const GlobalGameContext = createContext<IGlobalGameContext>(defaultContextValue);

export const useGlobalGameProvider = () => useContext(GlobalGameContext);

interface GlobalGameProviderProps {
  children: ReactNode;
}

export const GlobalGameProvider = ({ children }: GlobalGameProviderProps) => {
  const [gameId, setGameId] = useState<number | undefined>(undefined);
  const [universalGameId, setUniversalGameId] = useState<number | undefined>(undefined);
  const [gameType, setGameType] = useState<GameType>(GameType.AskGame);
  const [gameEntryMode, setGameEntryMode] = useState<GameEntryMode>(GameEntryMode.Participant);

  const clearValues = () => {
    setGameId(undefined);
    setUniversalGameId(undefined);
    setGameType(GameType.AskGame);
    setGameEntryMode(GameEntryMode.Participant);
  };

  const value = {
    clearValues,
    gameId,
    setGameId,
    universalGameId,
    setUniversalGameId,
    gameType,
    setGameType,
    gameEntryMode,
    setGameEntryMode,
  };

  return <GlobalGameContext.Provider value={value}>{children}</GlobalGameContext.Provider>;
};

export default GlobalGameProvider;
