import React, { createContext, ReactNode, useContext, useState } from "react";

interface IAskGameContext {}

const defaultContextValue: IAskGameContext = {};

const AskGameContext = createContext<IAskGameContext>(defaultContextValue);

export const useAskGameProvider = () => useContext(AskGameContext);

interface AskGameProviderProps {
  children: ReactNode;
}

export const AskGameProvider = ({ children }: AskGameProviderProps) => {
  const value = {};

  return (
    <AskGameContext.Provider value={value}>{children}</AskGameContext.Provider>
  );
};

export default AskGameProvider;
