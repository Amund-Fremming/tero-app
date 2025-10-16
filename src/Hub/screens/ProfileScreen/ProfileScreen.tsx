import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { Button, Pressable, Text, View } from "react-native";
import { styles } from "./profileScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useEffect, useState } from "react";
import { AuthService } from "@/src/common/services/authService";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { User } from "@/src/common/constants/types";

export const ProfileScreen = () => {
  const { displayErrorModal } = useModalProvider();
  const { logValues, rotateTokens, guestId, resetGuestId, redirectUri, triggerLogin, triggerLogout, accessToken } = useAuthProvider();
  const isLoggedIn = accessToken != null;

  const [userData, setUserData] = useState<User | undefined>(undefined);

  useEffect(() => {
    fetchUserData();
  }, [accessToken])

  const fetchUserData = async () => {
    let service = new AuthService();
    let guestResult = await service.getUserData(guestId, accessToken);
    if (guestResult.isError()) {
      displayErrorModal("Klarte ikke hente brukerdata");
      return;
    }
    setUserData(guestResult.value);
    return;
  }

  return (
    <View style={styles.container}>
      <View style={styles.debugBox}>
        <Text style={styles.debugHeader}>
          Debug tools
        </Text>
        <Text>Guest id: {guestId}</Text>
        <Text>User id: {userData?.id}</Text>
        <Text>User type: {userData?.userType}</Text>
        <Text>Redirect uri: {redirectUri}</Text>

        <Button title="reset guest id" onPress={resetGuestId} />
        <Button title="log values" onPress={logValues} />
        <Button title="rotate tokens" onPress={rotateTokens} />
      </View>

      <Text>ProfileScreen</Text>

      <Text>Userdata:</Text>
      <Text>name: {userData?.givenName} {userData?.familyName}</Text>
      <Text>Last active: {userData?.lastActive}</Text>
      <Text>gender: {userData?.gender}</Text>
      <Text>email: {userData?.email}</Text>
      <Text>email verified: {userData?.emailVerified}</Text>
      <Text>updated at: {userData?.updated_at}</Text>
      <Text>created at: {userData?.createdAt}</Text>
      <Text>birth date: {userData?.birthDate}</Text>

      {
        !isLoggedIn && (
          <Pressable style={styles.loginButton} onPress={triggerLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        )
      }

      {
        isLoggedIn && (
          <Pressable style={styles.loginButton} onPress={triggerLogout}>
            <Text style={styles.loginButtonText}>Logout</Text>
          </Pressable>
        )
      }

      <AbsoluteHomeButton />
    </View>
  );
};

export default ProfileScreen;
