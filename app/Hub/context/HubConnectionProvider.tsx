import * as signalR from "@microsoft/signalr";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInfoModalProvider } from "./InfoModalProvider";

interface IHubConnectionContext {
  connect: (endpoint: string) => void;
  disconnect: () => void;
  connection: signalR.HubConnection | undefined;
}

const defaultContextValue: IHubConnectionContext = {
  connect: (endpoint: string) => {},
  disconnect: () => {},
  connection: undefined,
};

const HubConnectionContext =
  createContext<IHubConnectionContext>(defaultContextValue);

export const useHubConnectionProvider = () => useContext(HubConnectionContext);

interface HubConnectionProviderProps {
  children: ReactNode;
}

export const HubConnectionProvider = ({
  children,
}: HubConnectionProviderProps) => {
  const [connection, setConnection] = useState<
    signalR.HubConnection | undefined
  >(undefined);
  const [connectedState, setConnectedState] = useState<boolean>(false);

  const connectionRef = useRef(connection);

  const { displayErrorModal, displayInfoModal } = useInfoModalProvider();

  useEffect(() => {
    connectionRef.current = connection;
  }, [connection]);

  setInterval(() => {
    if (!connectedState) {
      return;
    }

    if (!connectionRef.current) {
      // TODO - For games with hub call invalidate user from the correct api.
      displayErrorModal(
        "Du mistet tilkoblingen, vennligst forsøk å koble til igjen."
      );
      return;
    }

    // TODO - remove
    console.log("Connection still valid");
  }, 300);

  const connect = (endpoint: string) => {
    try {
      var hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(endpoint)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      setConnection(hubConnection);
      hubConnection.start();
      setConnectedState(true);
    } catch (error) {
      // TODO - remove log
      setConnectedState(false);
      console.error(error);
      displayErrorModal("En feil skjedde ved tilkoblingen.");
    }
  };

  const disconnect = () => {
    try {
      setConnectedState(false);
      if (!connection) {
        displayInfoModal("Du er ikke tilkoblet noe spill!");
        return;
      }

      connection.stop;
    } catch (error) {
      // TODO - remove log
      setConnectedState(false);
      console.error(error);
      displayErrorModal("En feil skjedde når du skulle forlate spillet.");
    }
  };

  const value = {
    connection,
    connect,
    disconnect,
  };

  return (
    <HubConnectionContext.Provider value={value}>
      {children}
    </HubConnectionContext.Provider>
  );
};

export default HubConnectionProvider;
