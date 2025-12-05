import React, { createContext, ReactNode, useContext, useState } from "react";
import { QuizSession } from "../constants/spinTypes";

interface IQuizGameContext {
  clearQuizGameValues: () => void;
  quizSession: QuizSession | undefined;
  setQuizSession: React.Dispatch<React.SetStateAction<QuizSession | undefined>>;
  iterations: number;
  setIterations: React.Dispatch<React.SetStateAction<number>>;
}

const defaultContextValue: IQuizGameContext = {
  clearQuizGameValues: () => {},
  quizSession: undefined,
  setQuizSession: () => {},
  iterations: 0,
  setIterations: () => {},
};

const QuizGameContext = createContext<IQuizGameContext>(defaultContextValue);

export const useQuizGameProvider = () => useContext(QuizGameContext);

interface QuizGameProviderProps {
  children: ReactNode;
}

export const QuizGameProvider = ({ children }: QuizGameProviderProps) => {
  const [quizSession, setQuizSession] = useState<QuizSession | undefined>(undefined);
  const [iterations, setIterations] = useState<number>(0);

  const clearQuizGameValues = () => {
    setQuizSession(undefined);
  };

  const value = {
    clearQuizGameValues,
    quizSession,
    setQuizSession,
    iterations,
    setIterations,
  };

  return <QuizGameContext.Provider value={value}>{children}</QuizGameContext.Provider>;
};

export default QuizGameProvider;
