import React, { createContext, ReactNode, useContext, useState } from "react";

interface ISpinGameContext {}

const defaultContextValue: ISpinGameContext = {};

const SpinGameContext = createContext<ISpinGameContext>(defaultContextValue);

export const useSpinGameProvider = () => useContext(SpinGameContext);

interface SpinGameProviderProps {
  children: ReactNode;
}

export const SpinGameProvider = ({ children }: SpinGameProviderProps) => {
  const value = {};

  return (
    <SpinGameContext.Provider value={value}>
      {children}
    </SpinGameContext.Provider>
  );
};

export default SpinGameProvider;
