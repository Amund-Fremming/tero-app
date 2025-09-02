import * as signalR from "@microsoft/signalr";
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useModalProvider } from "./ModalProvider";
import { HubUrlBase } from "../constants/Endpoints";
import { useNavigation } from "expo-router";
import Screen from "../constants/Screen";
import { ok, err, Result } from "../utils/result";

interface IHubConnectionContext {
  connect: (hubName: string, gameId: number) => Promise<Result<signalR.HubConnection>>;
  disconnect: () => Promise<Result>;
  setListener: <T>(channel: string, fn: (item: T) => void) => Result;
  invokeFunction: (functionName: string, ...params: any[]) => Promise<Result>;
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

  const { displayErrorModal } = useModalProvider();
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

  async function connect(hubName: string, gameId: number): Promise<Result<signalR.HubConnection>> {
    try {
      if (connectionRef.current) {
        const curHubName = (connectionRef.current as any)._hubName;
        const curHubId = (connectionRef.current as any)._hubId;

        if (curHubName !== hubName || curHubId !== gameId) {
          return err("Finnes allerede en åpen socket til feil hub. (HubConnectionProvider)");
        }

        console.info(`Returning established connection: ${curHubName}:${curHubId}`);
        return ok(connectionRef.current);
      }

      const endpoint = `${HubUrlBase}/${hubName}?GameId=${gameId}`;
      console.warn("Endpoint: ", endpoint);
      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(endpoint)
        .configureLogging(signalR.LogLevel.Information)
        .build();

      (hubConnection as any)._hubName = hubName;
      (hubConnection as any)._hubId = gameId;

      await hubConnection.start();
      hubConnection.onclose(async () => {
        clearValues();
        await hubConnection.stop();
      });

      setConnection(hubConnection);
      connectionRef.current = hubConnection;
      setConnectedState(true);
      connectedStateRef.current = true;

      console.info(`Established connection: ${hubName}:${gameId}`);
      return ok(hubConnection);
    } catch (error) {
      setConnectedState(false);
      return err("En feil skjedde ved tilkoblingen. (HubConnectionProvider)");
    }
  }

  async function disconnect(): Promise<Result> {
    console.info("Manual disconnect triggered.");
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
      setConnectedState(false);
      return err("En feil skjedde når du skulle forlate spillet.");
    }
  }

  function setListener<T>(channel: string, fn: (item: T) => void): Result {
    try {
      if (!connectionRef.current) {
        return err("Ingen tilkobling opprettet. (HubConnectionProvider)");
      }

      connectionRef.current.on(channel, fn);
      return ok();
    } catch (error) {
      console.error("setListener");
      return err("Noe gikk galt.");
    }
  }

  async function invokeFunction(functionName: string, ...params: any[]): Promise<Result> {
    try {
      if (!connectionRef?.current) {
        return err("Ingen tilkobling opprettet.");
      }

      await connectionRef.current?.invoke(functionName, ...params);
      return ok();
    } catch (error) {
      console.error("invokeFunction", error);
      return err("Tilkoblingen ble butt");
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
