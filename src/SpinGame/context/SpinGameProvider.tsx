import React, { createContext, ReactNode, useContext, useState } from "react";
import SpinGame from "../constants/spinTypes";

interface ISpinGameContext {
  spinGame: SpinGame | undefined;
  setSpinGame: React.Dispatch<React.SetStateAction<SpinGame | undefined>>;
  iterations: number;
  setIterations: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: ISpinGameContext = {
  spinGame: undefined,
  setSpinGame: () => { },
  iterations: 0,
  setIterations: () => { },
};

const SpinGameContext = createContext<ISpinGameContext>(defaultContextValue);

export const useSpinGameProvider = () => useContext(SpinGameContext);

interface SpinGameProviderProps {
  children: ReactNode;
}

export const SpinGameProvider = ({ children }: SpinGameProviderProps) => {
  const [spinGame, setSpinGame] = useState<SpinGame | undefined>();
  const [iterations, setIterations] = useState<number>(0);

  const value = {
    spinGame,
    setSpinGame,
    iterations,
    setIterations,
  };

  return <SpinGameContext.Provider value={value}>{children}</SpinGameContext.Provider>;
};

export default SpinGameProvider;
