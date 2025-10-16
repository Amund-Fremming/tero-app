import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Auth0Config } from "../components/Auth0/config";
import * as AuthSession from "expo-auth-session";
import { useModalProvider } from "./ModalProvider";
import * as WebBrowser from "expo-web-browser";
import { UserService } from "../services/userService";
import { PLATFORM_URL_BASE } from "../constants/endpoints";

const REFRESH_TOKEN_KEY = "refresh_token";

interface IAuthContext {
  redirectUri: string,
  guestId: string;
  setGuestId: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string | null;
  callUpdateUserActivity: () => Promise<void>;
  triggerLogin: () => void;
  triggerLogout: () => Promise<void>;
  rotateTokens: () => Promise<void>;

  // TODO - remove
  logValues: () => void;
  resetGuestId: () => void;
}

const defaultContextValue: IAuthContext = {
  redirectUri: "[NOT_SET]",
  guestId: "[NOT_SET]",
  setGuestId: () => { },
  accessToken: null,
  callUpdateUserActivity: async () => { },
  triggerLogin: () => { },
  triggerLogout: async () => { },
  rotateTokens: async () => { },

  // TODO - remove
  logValues: () => { },
  resetGuestId: () => { },
};

const AuthContext = createContext<IAuthContext>(defaultContextValue);

export const useAuthProvider = () => useContext(AuthContext);

// TODO - implement service provider
let service = new UserService(PLATFORM_URL_BASE);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [redirectUri, setRedirectUri] = useState<string>("[NOT_SET]");
  const [guestId, setGuestId] = useState<string>("[NOT_SET]");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { displayErrorModal } = useModalProvider();

  useEffect(() => {
    ensureGuestId();
    setRedirectUri(Auth0Config.redirectUri)
  }, []);

  const ensureGuestId = async () => {
    const storedGuestId = await SecureStore.getItemAsync("guest_id");
    if (storedGuestId) {
      setGuestId(storedGuestId);
      console.log("User id retrieved from localstorage:", storedGuestId); // TODO - remove log
      return;
    }

    let result = await service.ensureGuestId();
    if (result.isError()) {
      console.error(result.error); // TODO - remove log
      return;
    }

    setGuestId(result.value);
    await SecureStore.setItemAsync("guest_id", result.value);
    console.log("Guest user created with id: ", result.value);
  };

  const callUpdateUserActivity = async () => {
    const result = await service.patchUserActivity(guestId);
    if (result.isError()) {
      console.error(result.error);
    }
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: Auth0Config.clientId,
      scopes: ["openid", "profile", "name", "offline_access"],
      redirectUri: Auth0Config.redirectUri,
      responseType: "code",
      usePKCE: true,
      extraParams: {
        audience: Auth0Config.audience,
      },
    },
    Auth0Config.discovery
  );

  // Exchange code for tokens when response is successful
  useEffect(() => {
    const getTokens = async () => {
      if (response?.type === "success" && response.params.code) {
        try {
          const tokenResponse = await AuthSession.exchangeCodeAsync(
            {
              clientId: Auth0Config.clientId,
              code: response.params.code,
              redirectUri: Auth0Config.redirectUri,
              extraParams: {
                code_verifier: request?.codeVerifier || "",
              },
            },
            Auth0Config.discovery
          );

          if (!tokenResponse.accessToken || !tokenResponse.refreshToken) {
            displayErrorModal("Klarte ikke hente tokens fra auth0");
            return;
          }

          setAccessToken(tokenResponse.accessToken);
          await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokenResponse.refreshToken);
          console.info("User logged inn successfully");
        } catch (error) {
          console.error("Token exchange failed:", error);
          displayErrorModal("Feil ved tokenutveksling");
        }
      } else if (response?.type === "error") {
        displayErrorModal("Det skjedde en feil ved login");
      }
    };

    getTokens();
  }, [response]);

  const triggerLogin = () => {
    if (accessToken) {
      console.info("User is already logged in, skipping..");
      return;
    }

    if (!request) {
      displayErrorModal("Køen er full, vent litt med å forsøke igjen");
      return;
    }

    promptAsync().catch((e) => {
      console.error(e);
      displayErrorModal("Det skjedde en feil ved login");
    });
  };

  const triggerLogout = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

      if (!refreshToken) {
        // HANDLE
        displayErrorModal("THIS SHOULD NEVER HAPPEN");
        return;
      }

      const revokeConfig = {
        token: refreshToken,
        clientId: Auth0Config.clientId,
      };
      const revokeDiscovery = {
        revocationEndpoint: `https://${Auth0Config.domain}/oauth/revoke`,
      };
      await AuthSession.revokeAsync(revokeConfig, revokeDiscovery);

      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
      await SecureStore.deleteItemAsync("id_token");
      setAccessToken(null);

      const returnTo = Auth0Config.redirectUri;
      const params = new URLSearchParams({
        client_id: Auth0Config.clientId,
        returnTo: returnTo,
      });

      const logoutUrl = `https://${Auth0Config.domain}/v2/logout?${params.toString()}`;
      await WebBrowser.openAuthSessionAsync(logoutUrl, returnTo);

      console.log("User has been successfully logged out.");
    } catch (e) {
      console.error("Error during logout:", e);
      displayErrorModal("Noe feil skjedde ved utlogg");
    }
  };

  const rotateTokens = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        console.warn("Refreshtoken is undefined");
        setAccessToken(null);
        return;
      }

      const refreshResponse = await fetch(`https://${Auth0Config.domain}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: Auth0Config.clientId,
          refresh_token: refreshToken,
        }).toString(),
      });

      const tokens = await refreshResponse.json();

      if (!refreshResponse.ok) {
        displayErrorModal("Noe galt har skjedd med brukere din, ta kontakt.");
        triggerLogout();
        console.error(tokens);
        return;
      }

      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refresh_token);
      setAccessToken(tokens.access_token);
      console.log("Tokens refreshed successfully");
    } catch (error) {
      displayErrorModal("En uventet feil har skjedd, logger deg ut.");
      console.error(error);
    }
  };

  // TODO - remove
  const logValues = () => {
    console.log("Access token:", accessToken);
    console.log("Refresh token:", SecureStore.getItem(REFRESH_TOKEN_KEY));
    console.log("Guest id:", guestId);
  };

  // TODO - remove
  const resetGuestId = async () => {
    setGuestId("");
    await SecureStore.deleteItemAsync("guest_id");
  }

  const value = {
    callUpdateUserActivity,
    guestId,
    setGuestId,
    accessToken,
    triggerLogin,
    triggerLogout,
    rotateTokens,
    redirectUri,

    // TODO - remove
    logValues,
    resetGuestId
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
