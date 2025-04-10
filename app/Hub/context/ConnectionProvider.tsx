import * as signalR from "@microsoft/signalr";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface IConnectionContext {
    connection: signalR.HubConnection | undefined;
}

const defaultContextValue: IConnectionContext = {
    connection: undefined,
};

const ConnectionContext = createContext<IConnectionContext>(defaultContextValue);

export const useGlobalProvider = () => useContext(ConnectionContext);

interface GlobalProviderProps {
    children: ReactNode;
}

export const ConnectionProvider = ({ children }: GlobalProviderProps) => {
    const [gameId, setGameId] = useState(-1);
    const [connection, setConnection] = useState(undefined);

    const value = {
        gameId,
        setGameId,
        connection,
        setConnection
    };

    return (
        <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>
    );
};

export default ConnectionProvider;
