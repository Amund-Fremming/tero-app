import * as signalR from '@microsoft/signalr';

export const createConnection = (endpoint: string): signalR.HubConnection => {
    return new signalR.HubConnectionBuilder()
        .withUrl(endpoint)
        .configureLogging(signalR.LogLevel.Information)
        .build();
};

export const startConnection = async (connection: signalR.HubConnection) => {
    try {
        await connection.start();
    } catch (error) {
        return console.error("startConnection");
    }
};

export const stopConnection = async (connection: signalR.HubConnection) => {
    try {
        await connection.stop();
    } catch (error) {
        console.error("stopConnection");
    }
};

export const leaveGame = async (connection: signalR.HubConnection, gameId: number) => {
    try {
        await connection.invoke('LeaveGame', gameId);
    } catch (error) {
        console.error("leaveGame");
    }
};

export const joinGame = async (connection: signalR.HubConnection, gameId: number) => {
    try {
        await connection.invoke('JoinGame', gameId);
    } catch (error) {
        console.error("joinGame");
    }
};

export const startGame = async (connection: signalR.HubConnection, gameId: number) => {
    try {
        await connection.invoke('StartGame', gameId);
    } catch (error) {
        return Result.failure('Falied to connect, check your wifi');
    }
};
