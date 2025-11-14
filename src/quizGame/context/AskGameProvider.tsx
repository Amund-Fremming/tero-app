import React, { createContext, ReactNode, useContext, useState } from "react";
import { AskGame as QuizGame } from "../constants/spinTypes";

interface IQuizGameContext {
  clearQuizGameValues: () => void;
  quizGame: QuizGame | undefined;
  setQuizGame: React.Dispatch<React.SetStateAction<QuizGame | undefined>>;
}

const defaultContextValue: IQuizGameContext = {
  clearQuizGameValues: () => { },
  quizGame: undefined,
  setQuizGame: () => { },
};

const QuizGameContext = createContext<IQuizGameContext>(defaultContextValue);

export const useQuizGameProvider = () => useContext(QuizGameContext);

interface QuizGameProviderProps {
  children: ReactNode;
}

export const QuizGameProvider = ({ children }: QuizGameProviderProps) => {
  const [quizGame, setQuizGame] = useState<QuizGame | undefined>(undefined);

  const clearQuizGameValues = () => {
    setQuizGame(undefined);
  };

  const value = {
    clearQuizGameValues,
    quizGame,
    setQuizGame,
  };

  return <QuizGameContext.Provider value={value}>{children}</QuizGameContext.Provider>;
};

export default QuizGameProvider;
