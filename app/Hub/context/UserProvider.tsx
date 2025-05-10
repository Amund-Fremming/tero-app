import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createGuestUser, updateUserActivity } from "../services/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

interface IUserContext {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  markUserAsActive: () => Promise<void>;
}

const defaultContextValue: IUserContext = {
  userId: -1,
  setUserId: () => {},
  markUserAsActive: async () => {},
};

const UserContext = createContext<IUserContext>(defaultContextValue);

export const useUserProvider = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<number>(-1);

  useEffect(() => {
    ensureGuestUserId();
  }, []);

  const getFromLocalStorage = async (key: string) =>
    Platform.OS === "web" ? localStorage.getItem(key) : await AsyncStorage.getItem(key);

  const setToLocalStorage = async (key: string, value: string) =>
    Platform.OS !== "web" ? localStorage.setItem(key, value) : await AsyncStorage.setItem(key, value);

  const ensureGuestUserId = async () => {
    const storedUserId = await getFromLocalStorage("userId");
    if (storedUserId) {
      setUserId(Number.parseInt(storedUserId));
      console.log("User id retrieved from localstorage:", storedUserId); // TODO - remove log
      return;
    }

    const result = await createGuestUser();
    if (result.isErr()) {
      console.error(result.error); // TODO - remove log
      return;
    }

    setUserId(result.value.id);
    setToLocalStorage("userId", result.value.id.toString());
    console.log("Guest user created with id: ", result.value.id); // TODO - remove log
  };

  const markUserAsActive = async () => {
    const result = await updateUserActivity(userId);
    if (result.isErr()) {
      console.error(result.error);
    }
  };

  const value = {
    markUserAsActive,
    userId,
    setUserId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
