import React, { createContext, ReactNode, useContext, useState } from "react";

interface IGlobalGameContext {
  gameId: number;
  setGameId: (id: number) => void;
  universalId: string;
  setUniversalId: (id: string) => void;
  isCreator: boolean;
  setIsCreator: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: IGlobalGameContext = {
  gameId: -1,
  setGameId: () => {},
  universalId: "",
  setUniversalId: () => {},
  isCreator: false,
  setIsCreator: () => {},
};

const GlobalGameContext =
  createContext<IGlobalGameContext>(defaultContextValue);

export const useGlobalGameProvider = () => useContext(GlobalGameContext);

interface GlobalGameProviderProps {
  children: ReactNode;
}

export const GlobalGameProvider = ({ children }: GlobalGameProviderProps) => {
  const [gameId, setGameId] = useState<number>(-1);
  const [universalId, setUniversalId] = useState<string>("");
  const [isCreator, setIsCreator] = useState<boolean>(false);

  const value = {
    gameId,
    setGameId,
    universalId,
    setUniversalId,
    isCreator,
    setIsCreator,
  };

  return (
    <GlobalGameContext.Provider value={value}>
      {children}
    </GlobalGameContext.Provider>
  );
};

export default GlobalGameProvider;
