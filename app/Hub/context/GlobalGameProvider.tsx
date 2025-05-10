import React, { createContext, ReactNode, useContext, useState } from "react";
import { GameType } from "../constants/Types";

interface IGlobalGameContext {
  gameId: number | undefined;
  setGameId: React.Dispatch<React.SetStateAction<number | undefined>>;
  gameType: GameType;
  setGameType: React.Dispatch<React.SetStateAction<GameType>>;
  isCreator: boolean;
  setIsCreator: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: IGlobalGameContext = {
  gameId: undefined,
  setGameId: () => {},
  gameType: GameType.AskGame,
  setGameType: () => {},
  isCreator: false,
  setIsCreator: () => {},
};

const GlobalGameContext = createContext<IGlobalGameContext>(defaultContextValue);

export const useGlobalGameProvider = () => useContext(GlobalGameContext);

interface GlobalGameProviderProps {
  children: ReactNode;
}

export const GlobalGameProvider = ({ children }: GlobalGameProviderProps) => {
  const [gameId, setGameId] = useState<number | undefined>(undefined);
  const [gameType, setGameType] = useState<GameType>(GameType.AskGame);
  const [isCreator, setIsCreator] = useState<boolean>(false);

  const value = {
    gameId,
    setGameId,
    gameType,
    setGameType,
    isCreator,
    setIsCreator,
  };

  return <GlobalGameContext.Provider value={value}>{children}</GlobalGameContext.Provider>;
};

export default GlobalGameProvider;
