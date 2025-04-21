import React, { createContext, ReactNode, useContext, useState } from "react";
import AskGame from "../constants/AskTypes";
import EmptyAskGame from "../constants/EmptyObjects";

interface IAskGameContext {
  askGame: AskGame;
  setAskGame: React.Dispatch<React.SetStateAction<AskGame>>;
}

const defaultContextValue: IAskGameContext = {
  askGame: EmptyAskGame,
  setAskGame: () => {},
};

const AskGameContext = createContext<IAskGameContext>(defaultContextValue);

export const useAskGameProvider = () => useContext(AskGameContext);

interface AskGameProviderProps {
  children: ReactNode;
}

export const AskGameProvider = ({ children }: AskGameProviderProps) => {
  const [askGame, setAskGame] = useState<AskGame>(EmptyAskGame);

  const value = {
    askGame,
    setAskGame,
  };

  return (
    <AskGameContext.Provider value={value}>{children}</AskGameContext.Provider>
  );
};

export default AskGameProvider;
