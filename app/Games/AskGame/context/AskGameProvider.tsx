import React, { createContext, ReactNode, useContext, useState } from "react";
import { AskGame } from "../constants/AskTypes";

interface IAskGameContext {
  clearAskValues: () => void;
  askGame: AskGame | undefined;
  setAskGame: React.Dispatch<React.SetStateAction<AskGame | undefined>>;
  iterations: number;
  setIterations: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: IAskGameContext = {
  clearAskValues: () => {},
  askGame: undefined,
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
  const [askGame, setAskGame] = useState<AskGame | undefined>(undefined);
  const [iterations, setIterations] = useState<number>(0);

  const clearAskValues = () => {
    setAskGame(undefined);
    setIterations(0);
  };

  const value = {
    clearAskValues,
    askGame,
    setAskGame,
    iterations,
    setIterations,
  };

  return <AskGameContext.Provider value={value}>{children}</AskGameContext.Provider>;
};

export default AskGameProvider;
