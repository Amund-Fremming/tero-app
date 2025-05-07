import React, { createContext, ReactNode, useContext, useState } from "react";
import { AskGame } from "../constants/AskTypes";
import EmptyAskGame from "../constants/EmptyObjects";

interface IAskGameContext {
  askGame: AskGame;
  setAskGame: React.Dispatch<React.SetStateAction<AskGame>>;
  iterations: number;
  setIterations: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: IAskGameContext = {
  askGame: EmptyAskGame,
  setAskGame: () => {},
  iterations: 0,
  setIterations: () => {},
};

const AskGameContext = createContext<IAskGameContext>(defaultContextValue);

export const useAskGameProvider = () => useContext(AskGameContext);

interface AskGameProviderProps {
  children: ReactNode;
}

export const AskGameProvider = ({ children }: AskGameProviderProps) => {
  const [askGame, setAskGame] = useState<AskGame>(EmptyAskGame);
  const [iterations, setIterations] = useState<number>(0);

  const value = {
    askGame,
    setAskGame,
    iterations,
    setIterations,
  };

  return (
    <AskGameContext.Provider value={value}>{children}</AskGameContext.Provider>
  );
};

export default AskGameProvider;
