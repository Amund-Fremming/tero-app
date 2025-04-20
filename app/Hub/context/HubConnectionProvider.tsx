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
  getConnection: () => signalR.HubConnection | undefined;
}

const defaultContextValue: IHubConnectionContext = {
  connect: (endpoint: string) => {},
  disconnect: () => {},
  getConnection: () => undefined,
};

const HubConnectionContext =
  createContext<IHubConnectionContext>(defaultContextValue);

export const useGlobalProvider = () => useContext(HubConnectionContext);

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
      // TODO - call invalidate / disconnect user from game (that gets a new host also)
      displayErrorModal("You disconnected, please try to reconnect.");
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
      displayErrorModal("Something went wrong trying to create a connection.");
    }
  };

  const disconnect = () => {
    try {
      setConnectedState(false);
      if (!connection) {
        displayInfoModal("You are not connected to any game!");
        return;
      }

      connection.stop;
    } catch (error) {
      // TODO - remove log
      setConnectedState(false);
      console.error(error);
      displayErrorModal("Something went wrong trying to disconnect.");
    }
  };

  const getConnection = () => connection;

  const value = {
    getConnection,
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
