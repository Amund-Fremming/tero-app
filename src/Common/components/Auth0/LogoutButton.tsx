import { Text, Pressable } from "react-native";
import { useModalProvider } from "../../context/ModalProvider";
import * as AuthSession from "expo-auth-session";
import { Auth0Config } from "./config";

export const LogoutButton = () => {
  const { displayErrorModal } = useModalProvider();

  const handlePress = async () => {
    try {
      const logoutUrl = `https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(
        Auth0Config.redirectUri
      )}`;

      await AuthSession.startAsync({ authUrl: logoutUrl });
    } catch (e) {
      console.error(e);
      displayErrorModal("Det skjedde en feil ved utlogg.");
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Text>Logout</Text>
    </Pressable>
  );
};

export default LogoutButton;
