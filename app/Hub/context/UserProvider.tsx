import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createGuestUser, updateUserActivity } from "../services/userApi";

interface IUserContext {
  guestUserId: number | undefined;
  setGuesUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const defaultContextValue: IUserContext = {
  guestUserId: undefined,
  setGuesUserId: () => {},
};

const UserContext = createContext<IUserContext>(defaultContextValue);

export const useUserProvider = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const ensureGuestUserId = async () => {
    // TODO: Get from localstorage if not exist create new
    const result = await createGuestUser();
    setGuestUserId(result?.id);
    console.log("Gues user created with id: ", result?.id); // TODO - remove log
  };

  const markUserAsActive = async () => {
    // TODO: more logic, update registered user or guest user logic
    if (guestUserId) {
      await updateUserActivity(guestUserId);
    }
  };

  useEffect(() => {
    ensureGuestUserId();
  }, []);

  const [guestUserId, setGuestUserId] = useState<number | undefined>(undefined);

  const value = {
    guestUserId,
    setGuesUserId: setGuestUserId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
