import React, { createContext, ReactNode, useContext, useState } from "react";

interface IGameStateContext {}

const defaultContextValue: IGameStateContext = {};

const ActionModalContext =
  createContext<IGameStateContext>(defaultContextValue);

export const useGameStateProvider = () => useContext(ActionModalContext);

interface GameStateProviderProps {
  children: ReactNode;
}

export const GameStateProvider = ({ children }: GameStateProviderProps) => {
  const value = {};

  return (
    <ActionModalContext.Provider value={value}>
      {children}
    </ActionModalContext.Provider>
  );
};

export default GameStateProvider;
