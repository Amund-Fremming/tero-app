import React, { createContext, ReactNode, useContext, useRef } from "react";
import { GameService } from "../services/gameService";
import { PLATFORM_URL_BASE } from "../constants/endpoints";
import { UserService } from "../services/userService";

interface IServiceProviderContext {
    gameService: () => GameService,
    userService: () => UserService,
}

const ServiceProviderContext = createContext<IServiceProviderContext>({
    gameService: () => new GameService(PLATFORM_URL_BASE),
    userService: () => new UserService(PLATFORM_URL_BASE),
});

export const useServiceProvider = () => useContext(ServiceProviderContext);

interface ServiceProviderProps {
    children: ReactNode;
}

export const ServiceProvider = ({ children }: ServiceProviderProps) => {
    const gameServiceRef = useRef(new GameService(PLATFORM_URL_BASE));
    const userServiceRef = useRef(new UserService(PLATFORM_URL_BASE));

    const gameService = () => gameServiceRef.current;
    const userService = () => userServiceRef.current;

    const value = {
        gameService,
        userService,
    };


    return (
        <ServiceProviderContext.Provider value={value}>
            {children}
        </ServiceProviderContext.Provider>
    );
};

export default ServiceProvider;
