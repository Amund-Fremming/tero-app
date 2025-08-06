import AbsoluteHomeButton from "@/src/Common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import LoginButton from "@/src/Common/components/Auth0/LoginButton";
import LogoutButton from "@/src/Common/components/Auth0/LogoutButton";
import { Text, View } from "react-native";
import { styles } from "./profileScreenStyles";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>

      <View>
        <Text>Brukerdata:</Text>
      </View>

      <LoginButton />
      <LogoutButton />

      <AbsoluteHomeButton />
    </View>
  );
};

export default ProfileScreen;
