import AbsoluteHomeButton from "@/src/Common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import LoginButton from "@/src/Common/components/Auth0/LoginButton";
import LogoutButton from "@/src/Common/components/Auth0/LogoutButton";
import { Button, Text, View } from "react-native";
import { styles } from "./profileScreenStyles";
import { useAuthProvider } from "@/src/Common/context/AuthProvider";

export const ProfileScreen = () => {
  const { logValues, rotateTokens } = useAuthProvider();

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>

      <View>
        <Text>Brukerdata:</Text>
      </View>

      <LoginButton />
      <LogoutButton />

      <Button title="log values" onPress={logValues} />
      <Button title="rotate tokens" onPress={rotateTokens} />

      <AbsoluteHomeButton />
    </View>
  );
};

export default ProfileScreen;
