import { Text, Pressable } from "react-native";
import { useModalProvider } from "../../context/ModalProvider";
import React, { useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import { Auth0Config } from "./config";
import { useAuthProvider } from "../../context/AuthProvider";

const discovery = {
  authorizationEndpoint: `https://${Auth0Config.domain}/authorize`,
  tokenEndpoint: `https://${Auth0Config.domain}/oauth/token`,
  revocationEndpoint: `https://${Auth0Config.domain}/oauth/revoke`,
};

export const LoginButton = () => {
  const { triggerLogin } = useAuthProvider();

  const handlePress = () => {
    triggerLogin();
  };

  return (
    <Pressable onPress={handlePress}>
      <Text>Login</Text>
    </Pressable>
  );
};

export default LoginButton;
