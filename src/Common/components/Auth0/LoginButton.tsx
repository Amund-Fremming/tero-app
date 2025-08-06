import { Text, Pressable } from "react-native";
import { useModalProvider } from "../../context/ModalProvider";
import React, { useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import { Auth0Config } from "./config";

const discovery = {
  authorizationEndpoint: `https://${Auth0Config.domain}/authorize`,
  tokenEndpoint: `https://${Auth0Config.domain}/oauth/token`,
  revocationEndpoint: `https://${Auth0Config.domain}/oauth/revoke`,
};

export const LoginButton = () => {
  const { displayErrorModal } = useModalProvider();

  console.log("Redirect uri: ", Auth0Config.redirectUri);

  // CALL THE HOOK HERE at the top level of your component
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: Auth0Config.clientId,
      scopes: ["openid", "profile", "email"],
      redirectUri: Auth0Config.redirectUri,
      responseType: "token",
    },
    discovery
  );

  // Handle response when it changes
  useEffect(() => {
    if (response?.type === "success") {
      console.log("Login success", response.params);
      // You can handle tokens or user info here
    } else if (response?.type === "error") {
      displayErrorModal("Det skjedde en feil ved login");
    }
  }, [response]);

  const handlePress = () => {
    if (!request) {
      displayErrorModal("Login request not ready");
      return;
    }
    promptAsync().catch((e) => {
      console.error(e);
      displayErrorModal("Det skjedde en feil ved login");
    });
  };

  return (
    <Pressable onPress={handlePress} disabled={!request}>
      <Text>Login</Text>
    </Pressable>
  );
};

export default LoginButton;
