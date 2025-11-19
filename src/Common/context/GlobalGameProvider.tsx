import React, { createContext, ReactNode, useContext, useState } from "react";
import { GameEntryMode, GameType } from "../constants/types";

interface IGlobalGameContext {
  clearValues: () => void;
  gameEntryMode: GameEntryMode;
  setGameEntryMode: React.Dispatch<React.SetStateAction<GameEntryMode>>;
  setIterations: React.Dispatch<React.SetStateAction<number>>;
  gameType: GameType;
  setGameType: React.Dispatch<React.SetStateAction<GameType>>;
}

const defaultContextValue: IGlobalGameContext = {
  clearValues: () => { },
  gameEntryMode: GameEntryMode.Host,
  setGameEntryMode: () => { },
  setIterations: () => { },
  gameType: GameType.Spin,
  setGameType: () => { },
};

const GlobalGameContext = createContext<IGlobalGameContext>(defaultContextValue);

export const useGlobalGameProvider = () => useContext(GlobalGameContext);

interface GlobalGameProviderProps {
  children: ReactNode;
}

export const GlobalGameProvider = ({ children }: GlobalGameProviderProps) => {
  const [gameEntryMode, setGameEntryMode] = useState<GameEntryMode>(GameEntryMode.Host);
  const [gameType, setGameType] = useState<GameType>(GameType.Spin);
  const [iterations, setIterations] = useState<number>(0);

  const clearValues = () => {
    setIterations(0);
  }

  const value = {
    clearValues,
    setIterations,
    gameEntryMode,
    setGameEntryMode,
    gameType,
    setGameType,
  };

  return <GlobalGameContext.Provider value={value}>{children}</GlobalGameContext.Provider>;
};

export default GlobalGameProvider;
