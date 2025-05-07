import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createGuestUser, updateUserActivity } from "../services/userApi";
import { useInfoModalProvider } from "./InfoModalProvider";

interface IUserContext {
  guestUserId: number;
  setGuesUserId: React.Dispatch<React.SetStateAction<number>>;
  markUserAsActive: () => Promise<void>;
}

const defaultContextValue: IUserContext = {
  guestUserId: -1,
  setGuesUserId: () => {},
  markUserAsActive: async () => {},
};

const UserContext = createContext<IUserContext>(defaultContextValue);

export const useUserProvider = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { displayErrorModal } = useInfoModalProvider();

  const ensureGuestUserId = async () => {
    // TODO: Get from localstorage if not exist create new
    const result = await createGuestUser();
    if (result.isErr()) {
      console.error(result.error); // TODO - remove log
      displayErrorModal("Noe har gått galt, lukk appen og forsøk igjen.");
      return;
    }

    setGuestUserId(result.value.id);
    console.log("Guest user created with id: ", result.value.id); // TODO - remove log
  };

  const markUserAsActive = async () => {
    // TODO: more logic, update registered user or guest user logic
    var result = await updateUserActivity(guestUserId);
    if (result.isErr()) {
      console.error(result.error);
    }
  };

  useEffect(() => {
    ensureGuestUserId();
  }, []);

  const [guestUserId, setGuestUserId] = useState<number>(-1);

  const value = {
    markUserAsActive,
    guestUserId,
    setGuesUserId: setGuestUserId,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
