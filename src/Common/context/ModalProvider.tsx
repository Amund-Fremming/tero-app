import React, { createContext, ReactNode, useContext, useState } from "react";
import InfoModal from "../components/InfoModal/InfoModal";
import ActionModal from "../components/ActionModal/ActionModal";
import { Modal } from "react-native";

enum DisplayOption {
  None,
  Error,
  Info,
  Action,
}

interface IModalContext {
  displayActionModal: (message: string, onLeftCloseAction: () => void, onRightCloseAction: () => void) => void;
  displayErrorModal: (errorMessage: string, onCloseAction?: () => void) => void;
  displayInfoModal: (infoModal: string, onCloseAction?: () => void) => void;
}

const defaultContextValue: IModalContext = {
  displayActionModal: () => { },
  displayErrorModal: () => { },
  displayInfoModal: () => { },
};

const ModalContext = createContext<IModalContext>(defaultContextValue);

export const useModalProvider = () => useContext(ModalContext);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [onCloseFunc, setOnCloseFunc] = useState<() => void>(() => { });
  const [onLeftCloseFunc, setOnLeftCloseFunc] = useState<() => void>(() => { });
  const [onRightCloseFunc, setOnRightCloseFunc] = useState<() => void>(() => { });
  const [displayOption, setDisplayOption] = useState<DisplayOption>(DisplayOption.None);
  const [message, setMessage] = useState<string>("");

  const displayErrorModal = (message: string, onCloseAction?: () => void) => {
    const fn = () => {
      onCloseAction && onCloseAction();
      setDisplayOption(DisplayOption.None);
    };

    setOnCloseFunc(() => fn);
    setDisplayOption(DisplayOption.Error);
    setMessage(message);
  };

  const displayInfoModal = (message: string, onCloseAction?: () => void) => {
    const fn = () => {
      onCloseAction && onCloseAction();
      setDisplayOption(DisplayOption.None);
    };

    setOnCloseFunc(() => fn);
    setDisplayOption(DisplayOption.Info);
    setMessage(message);
  };

  const displayActionModal = (message: string, onLeftCloseAction: () => void, onRightCloseAction: () => void) => {
    const leftFn = () => {
      onLeftCloseAction();
      setDisplayOption(DisplayOption.None);
    };

    const rightFn = () => {
      onRightCloseAction();
      setDisplayOption(DisplayOption.None);
    };

    setOnLeftCloseFunc(() => leftFn);
    setOnRightCloseFunc(() => rightFn);
    setDisplayOption(DisplayOption.Action);
    setMessage(message);
  };

  const value = {
    displayErrorModal,
    displayInfoModal,
    displayActionModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal visible={displayOption !== DisplayOption.None} animationType="fade" transparent={true}>
        {displayOption === DisplayOption.Info ||
          (displayOption === DisplayOption.Error && (
            <InfoModal message={message} isError={displayOption === DisplayOption.Error} onCloseFunc={onCloseFunc} />
          ))}

        {displayOption === DisplayOption.Action && (
          <ActionModal message={message} onLeftClick={onLeftCloseFunc} onRightClick={onRightCloseFunc} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
