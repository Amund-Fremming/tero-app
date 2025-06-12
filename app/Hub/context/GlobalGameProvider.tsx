import React, { createContext, ReactNode, useContext, useState } from "react";
import { GameEntryMode, GameType, UniversalGameValues } from "../constants/Types";

interface IGlobalGameContext {
  clearValues: () => void;
  gameEntryMode: GameEntryMode;
  setGameEntryMode: React.Dispatch<React.SetStateAction<GameEntryMode>>;
  universalGameValues: UniversalGameValues | undefined;
  setUniversalGameValues: (
    gameId?: number,
    universalGameId?: number,
    gameType?: GameType,
    gameEntryMode?: GameEntryMode,
    iterations?: number
  ) => void;
}

const defaultContextValue: IGlobalGameContext = {
  clearValues: () => {},
  gameEntryMode: GameEntryMode.Host,
  setGameEntryMode: () => {},
  universalGameValues: undefined,
  setUniversalGameValues: (
    _gameId?: number,
    _universalGameId?: number,
    _gameType?: GameType,
    _gameEntryMode?: GameEntryMode,
    _iterations?: number
  ) => {},
};

const GlobalGameContext = createContext<IGlobalGameContext>(defaultContextValue);

export const useGlobalGameProvider = () => useContext(GlobalGameContext);

interface GlobalGameProviderProps {
  children: ReactNode;
}

export const GlobalGameProvider = ({ children }: GlobalGameProviderProps) => {
  const [universalGameValues, setUniversalGameValuesInternal] = useState<UniversalGameValues | undefined>(undefined);
  const [gameEntryMode, setGameEntryMode] = useState<GameEntryMode>(GameEntryMode.Host);

  const clearValues = () => {
    setUniversalGameValuesInternal(undefined);
  };

  const setUniversalGameValues = (
    gameId?: number,
    universalGameId?: number,
    gameType?: GameType,
    gameEntryMode?: GameEntryMode,
    iterations?: number
  ) => {
    if (!universalGameValues) {
      return;
    }

    setUniversalGameValuesInternal((prev) =>
      prev === undefined
        ? undefined
        : {
            gameId: gameId ?? prev.gameId,
            universalGameId: universalGameId ?? prev.universalGameId,
            gameType: gameType ?? prev.gameType,
            iterations: iterations ?? prev.iterations,
          }
    );
  };

  const value = {
    clearValues,
    gameEntryMode,
    setGameEntryMode,
    universalGameValues,
    setUniversalGameValues,
  };

  return <GlobalGameContext.Provider value={value}>{children}</GlobalGameContext.Provider>;
};

export default GlobalGameProvider;
