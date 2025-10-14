import React, { createContext, ReactNode, useContext, useState } from "react";
import { AskGame } from "../constants/askTypes";

interface IAskGameContext {
  clearAskValues: () => void;
  askGame: AskGame | undefined;
  setAskGame: React.Dispatch<React.SetStateAction<AskGame | undefined>>;
}

const defaultContextValue: IAskGameContext = {
  clearAskValues: () => { },
  askGame: undefined,
  setAskGame: () => { },
};

const AskGameContext = createContext<IAskGameContext>(defaultContextValue);

export const useAskGameProvider = () => useContext(AskGameContext);

interface AskGameProviderProps {
  children: ReactNode;
}

export const AskGameProvider = ({ children }: AskGameProviderProps) => {
  const [askGame, setAskGame] = useState<AskGame | undefined>(undefined);

  const clearAskValues = () => {
    setAskGame(undefined);
  };

  const value = {
    clearAskValues,
    askGame,
    setAskGame,
  };

  return <AskGameContext.Provider value={value}>{children}</AskGameContext.Provider>;
};

export default AskGameProvider;
