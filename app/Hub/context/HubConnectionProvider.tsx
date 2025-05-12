import * as signalR from "@microsoft/signalr";
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useInfoModalProvider } from "./InfoModalProvider";
import { HubUrlBase } from "../constants/Endpoints";
import { Result, ok, err } from "neverthrow";
import { useNavigation } from "expo-router";
import Screen from "../constants/Screen";

interface IHubConnectionContext {
  connect: (hubName: string, gameId: number) => Promise<Result<signalR.HubConnection, string>>;
  disconnect: () => Promise<Result<void, string>>;
  setListener: <T>(channel: string, fn: (item: T) => void) => Result<void, string>;
  invokeFunction: (functionName: string, ...params: any[]) => Promise<Result<void, string>>;
}

const defaultContextValue: IHubConnectionContext = {
  connect: async (_hubName: string, _gameId: number) => err(""),
  disconnect: async () => err(""),
  setListener: (_channel: string, _fn: (item: any) => void) => err(""),
  invokeFunction: async (_functionName: string, ..._params: any[]) => err(""),
};

const HubConnectionContext = createContext<IHubConnectionContext>(defaultContextValue);

export const useHubConnectionProvider = () => useContext(HubConnectionContext);

interface HubConnectionProviderProps {
  children: ReactNode;
}

export const HubConnectionProvider = ({ children }: HubConnectionProviderProps) => {
  const [connection, setConnection] = useState<signalR.HubConnection | undefined>(undefined);
  const [connectedState, setConnectedState] = useState<boolean>(false);

  const connectionRef = useRef(connection);
  const connectedStateRef = useRef(connectedState);

  const { displayErrorModal } = useInfoModalProvider();
  const navigation: any = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!connectedStateRef.current) return;
      if (!connectedStateRef.current && connectionRef.current) {
        disconnect();
        return;
      }

      if (!connectionRef.current) {
        // TODO - For games with hub call invalidate user from the correct api.
        clearValues();
        displayErrorModal("Du mistet tilkoblingen, vennligst forsøk å koble til igjen.", () =>
          navigation.navigate(Screen.Home)
        );
        return;
      }
    }, 750);

    return () => clearInterval(interval);
  }, []);

  async function connect(hubName: string, gameId: number): Promise<Result<signalR.HubConnection, string>> {
    try {
      if (connectionRef.current) {
        return err("Noe gikk galt. Forsøk å lukke og starte appen på nytt.");
      }

      const endpoint = `${HubUrlBase}/${hubName}?GameId=${gameId}`;
      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(endpoint)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      await hubConnection.start();
      hubConnection.onclose(() => clearValues());
      setConnection(hubConnection);
      connectionRef.current = hubConnection;
      setConnectedState(true);
      connectedStateRef.current = true;

      return ok(hubConnection);
    } catch (error) {
      setConnectedState(false);
      return err("En feil skjedde ved tilkoblingen.");
    }
  }

  async function disconnect(): Promise<Result<void, string>> {
    try {
      if (!connectionRef.current) {
        clearValues();
        return ok();
      }

      await connection?.stop();
      await connectionRef.current.stop();
      clearValues();

      return ok();
    } catch (error) {
      setConnectedState(false); // TODO - remove log
      return err("En feil skjedde når du skulle forlate spillet.");
    }
  }

  function setListener<T>(channel: string, fn: (item: T) => void): Result<void, string> {
    try {
      if (!connectionRef.current) {
        return err("Ingen tilkobling opprettet.");
      }

      connectionRef.current.on(channel, fn);
      return ok();
    } catch (error) {
      console.error("setListener");
      return err("Noe gikk galt.");
    }
  }

  async function invokeFunction(functionName: string, ...params: any[]): Promise<Result<void, string>> {
    try {
      if (!connectionRef.current) {
        return err("Ingen tilkobling opprettet.");
      }
      await connectionRef.current?.invoke(functionName, ...params);
      return ok();
    } catch (error) {
      console.error("invokeFunction");
      return err("Noe gikk galt.");
    }
  }

  const clearValues = () => {
    setConnection(undefined);
    connectionRef.current = undefined;
    setConnectedState(false);
    connectedStateRef.current = false;
  };

  const value = {
    invokeFunction,
    setListener,
    connect,
    disconnect,
  };

  return <HubConnectionContext.Provider value={value}>{children}</HubConnectionContext.Provider>;
};

export default HubConnectionProvider;
