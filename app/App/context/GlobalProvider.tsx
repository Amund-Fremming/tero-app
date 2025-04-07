import React, { createContext, ReactNode, useContext, useState } from "react";

interface IGlobalContext {}

const defaultContextValue: IGlobalContext = {};

const GlobalContext = createContext<IGlobalContext>(defaultContextValue);

export const useGlobalProvider = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const value = {};

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
