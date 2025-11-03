import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { Button, Pressable, Text, View } from "react-native";
import { styles } from "./profileScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useEffect, useState } from "react";
import { UserService } from "@/src/common/services/userService";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { User } from "@/src/common/constants/types";
import { PLATFORM_URL_BASE } from "@/src/common/constants/endpoints";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";

export const ProfileScreen = () => {
  const { displayErrorModal } = useModalProvider();
  const { logValues, rotateTokens, guestId, resetGuestId, redirectUri, triggerLogin, triggerLogout, accessToken, invalidateAccessToken } = useAuthProvider();
  const { userService } = useServiceProvider();

  const isLoggedIn = accessToken != null;

  const [userData, setUserData] = useState<User | undefined>(undefined);

  useEffect(() => {
    fetchUserData();
    console.log("Callback url:", redirectUri)
  }, [accessToken])

  const fetchUserData = async () => {
    let guestResult = await userService().getUserData(guestId, accessToken);
    if (guestResult.isError()) {
      displayErrorModal("Klarte ikke hente brukerdata");
      return;
    }

    console.info(userData);
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

        <Button title="Invalidate AT" onPress={invalidateAccessToken} />
        <Button title="reset guest id" onPress={resetGuestId} />
        <Button title="log values" onPress={logValues} />
        <Button title="rotate tokens" onPress={rotateTokens} />
      </View>

      <Text>ProfileScreen</Text>

      {
        isLoggedIn && (
          <View style={styles.loggedIn}>
            <Text>Userdata:</Text>
            <Text>username: {userData?.username}</Text>
            <Text>name: {userData?.givenName} {userData?.familyName}</Text>
            <Text>Last active: {userData?.lastActive}</Text>
            <Text>gender: {userData?.gender}</Text>
            <Text>email: {userData?.email}</Text>
            <Text>email verified: {userData?.emailVerified ? "yes" : "no"}</Text>
            <Text>updated at: {userData?.updated_at}</Text>
            <Text>created at: {userData?.createdAt}</Text>
            <Text>birth date: {userData?.birthDate}</Text>

            <Pressable style={styles.loginButton} onPress={triggerLogout}>
              <Text style={styles.loginButtonText}>Logout</Text>
            </Pressable>
          </View>
        )
      }

      {
        !isLoggedIn && (


          <Pressable style={styles.loginButton} onPress={triggerLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        )
      }

      <AbsoluteHomeButton />
    </View>
  );
};

export default ProfileScreen;
