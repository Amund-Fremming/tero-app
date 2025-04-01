import React, { createContext, ReactNode, useContext, useState } from "react";
import InfoModal from "../components/InfoModal/InfoModal";

interface IInfoModalContext {
  openErrorModal: (errorMessage: string) => void;
  openInfoModal: (infoModal: string) => void;
}

const defaultContextValue: IInfoModalContext = {
  openErrorModal: () => {},
  openInfoModal: () => {},
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

  const openErrorModal = (errorMessage: string) => {
    setMessage(errorMessage);
    setIsError(true);
    setModalVisible(true);
  };

  const openInfoModal = (infoMessage: string) => {
    setMessage(infoMessage);
    setIsError(false);
    setModalVisible(true);
  };

  const value = {
    openErrorModal,
    openInfoModal,
  };

  return (
    <InfoModalContext.Provider value={value}>
      {children}
      <InfoModal
        message={message}
        isError={isError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </InfoModalContext.Provider>
  );
};

export default InfoModalProvider;
