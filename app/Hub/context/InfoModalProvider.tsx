import React, { createContext, ReactNode, useContext, useState } from "react";
import InfoModal from "../components/InfoModal/InfoModal";

interface IInfoModalContext {
  displayErrorModal: (errorMessage: string) => void;
  displayInfoModal: (infoModal: string) => void;
}

const defaultContextValue: IInfoModalContext = {
  displayErrorModal: () => {},
  displayInfoModal: () => {},
};

const InfoModalContext = createContext<IInfoModalContext>(defaultContextValue);

export const useInfoModalProvider = () => useContext(InfoModalContext);

interface InfoModalProviderProps {
  children: ReactNode;
}

export const InfoModalProvider = ({ children }: InfoModalProviderProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [onCloseFunc, setOnCloseFunc] = useState<() => void>(() => {});

  const displayErrorModal = (
    errorMessage: string,
    onCloseAction?: () => void
  ) => {
    if (onCloseAction) {
      setOnCloseFunc(onCloseAction);
    }
    setMessage(errorMessage);
    setIsError(true);
    setModalVisible(true);
  };

  const displayInfoModal = (
    infoMessage: string,
    onCloseAction?: () => void
  ) => {
    if (onCloseAction) {
      setOnCloseFunc(onCloseAction);
    }
    setMessage(infoMessage);
    setIsError(false);
    setModalVisible(true);
  };

  const value = {
    displayErrorModal,
    displayInfoModal,
  };

  return (
    <InfoModalContext.Provider value={value}>
      {children}
      <InfoModal
        message={message}
        isError={isError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onCloseFunc={onCloseFunc}
      />
    </InfoModalContext.Provider>
  );
};

export default InfoModalProvider;
