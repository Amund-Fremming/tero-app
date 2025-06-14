import React, { createContext, ReactNode, useContext, useState } from "react";
import { GameEntryMode, GameType, UniversalGameValues } from "../constants/Types";

interface IGlobalGameContext {
  clearValues: () => void;
  gameEntryMode: GameEntryMode;
  setGameEntryMode: React.Dispatch<React.SetStateAction<GameEntryMode>>;
  universalGameValues: UniversalGameValues | undefined;
  setUniversalGameValues: React.Dispatch<React.SetStateAction<UniversalGameValues | undefined>>;
  setIterations: (iterations: number) => void;
}

const defaultContextValue: IGlobalGameContext = {
  clearValues: () => {},
  gameEntryMode: GameEntryMode.Host,
  setGameEntryMode: () => {},
  universalGameValues: undefined,
  setUniversalGameValues: () => {},
  setIterations: (_iterations: number) => {},
};

const GlobalGameContext = createContext<IGlobalGameContext>(defaultContextValue);

export const useGlobalGameProvider = () => useContext(GlobalGameContext);

interface GlobalGameProviderProps {
  children: ReactNode;
}

export const GlobalGameProvider = ({ children }: GlobalGameProviderProps) => {
  const [universalGameValues, setUniversalGameValues] = useState<UniversalGameValues | undefined>(undefined);
  const [gameEntryMode, setGameEntryMode] = useState<GameEntryMode>(GameEntryMode.Host);

  const clearValues = () => setUniversalGameValues(undefined);

  const setIterations = (iterations: number) =>
    setUniversalGameValues((prev) => {
      if (!prev) {
        return undefined;
      }

      return { ...prev, iterations };
    });

  const value = {
    clearValues,
    gameEntryMode,
    setGameEntryMode,
    universalGameValues,
    setUniversalGameValues,
    setIterations,
  };

  return <GlobalGameContext.Provider value={value}>{children}</GlobalGameContext.Provider>;
};

export default GlobalGameProvider;
