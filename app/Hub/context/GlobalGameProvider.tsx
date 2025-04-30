import React, { createContext, ReactNode, useContext, useState } from "react";

interface IGlobalGameContext {
  universalId: number;
  setUniversalId: React.Dispatch<React.SetStateAction<number>>;
  gameType: "AskGame" | "SpinGame" | "";
  setGameType: React.Dispatch<
    React.SetStateAction<"AskGame" | "SpinGame" | "">
  >;
  isCreator: boolean;
  setIsCreator: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: IGlobalGameContext = {
  universalId: -1,
  setUniversalId: () => {},
  gameType: "",
  setGameType: () => {},
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
  const [universalId, setUniversalId] = useState<number>(-1);
  const [gameType, setGameType] = useState<"AskGame" | "SpinGame" | "">("");
  const [isCreator, setIsCreator] = useState<boolean>(false);

  const value = {
    universalId,
    setUniversalId,
    gameType,
    setGameType,
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
