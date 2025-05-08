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
import { HubUrlBase } from "../constants/Endpoints";
import { Result, ok, err } from "neverthrow";

interface IHubConnectionContext {
  connect: (
    hubName: string,
    gameId: number
  ) => Result<signalR.HubConnection, string>;
  disconnect: () => void;
  connection: signalR.HubConnection | undefined;
}

const defaultContextValue: IHubConnectionContext = {
  connect: () => {
    return err("");
  },
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

  const { displayErrorModal } = useInfoModalProvider();

  useEffect(() => {
    connectionRef.current = connection;
  }, [connection]);

  setInterval(() => {
    if (!connectedState) {
      return;
    }

    if (!connectionRef.current) {
      // TODO - For games with hub call invalidate user from the correct api.
      // TODO - kaste bruker så tilbake til hjemmesiden
      displayErrorModal(
        "Du mistet tilkoblingen, vennligst forsøk å koble til igjen."
      );
      return;
    }

    // TODO - remove log
    console.log("Connection still valid");
  }, 500);

  const connect = (
    hubName: string,
    gameId: number
  ): Result<signalR.HubConnection, string> => {
    try {
      var endpoint = `${HubUrlBase}/${hubName}?GameId=${gameId}`;

      var hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(endpoint)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      setConnection(hubConnection);
      hubConnection.start();
      setConnectedState(true);
      return ok(hubConnection);
    } catch (error) {
      // TODO - remove log
      setConnectedState(false);
      console.error(error);
      return err("En feil skjedde ved tilkoblingen.");
    }
  };

  const disconnect = () => {
    try {
      setConnectedState(false);
      if (!connection) {
        return err("Du er ikke tilkoblet noe spill!");
      }

      connection.stop;
      return ok();
    } catch (error) {
      // TODO - remove log
      setConnectedState(false);
      console.error(error);
      return err("En feil skjedde når du skulle forlate spillet.");
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
