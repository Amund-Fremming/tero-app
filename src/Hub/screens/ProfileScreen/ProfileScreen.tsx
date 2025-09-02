import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import LoginButton from "@/src/common/components/Auth0/LoginButton";
import LogoutButton from "@/src/common/components/Auth0/LogoutButton";
import { Button, Text, View } from "react-native";
import { styles } from "./profileScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";

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
