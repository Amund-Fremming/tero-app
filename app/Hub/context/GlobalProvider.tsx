import React, { createContext, ReactNode, useContext, useState } from "react";

interface IGlobalContext {
  gameId: number;
  setGameId: (id: number) => void;
}

const defaultContextValue: IGlobalContext = {
  gameId: -1,
  setGameId: () => {},
};

const GlobalContext = createContext<IGlobalContext>(defaultContextValue);

export const useGlobalProvider = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [gameId, setGameId] = useState<number>(-1);

  const value = {
    gameId,
    setGameId,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
