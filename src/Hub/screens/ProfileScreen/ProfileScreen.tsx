import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { Button, Image, Pressable, Text, View } from "react-native";
import { styles } from "./profileScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useEffect, useState } from "react";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { User } from "@/src/common/constants/types";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";

export const ProfileScreen = () => {
  const { displayErrorModal } = useModalProvider();
  const { logValues, rotateTokens, guestId, resetGuestId, redirectUri, triggerLogin, triggerLogout, accessToken, invalidateAccessToken } = useAuthProvider();
  const { userService } = useServiceProvider();

  const isLoggedIn = accessToken != null;

  const [avatar, setAvatar] = useState<string>("");
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [displayDebugTools, setDisplayDebugTools] = useState<boolean>(false);

  useEffect(() => {
    fetchUserData();
    console.log("Callback url:", redirectUri)
  }, [accessToken])

  const fetchUserData = async () => {

    if (!accessToken) {
      return;
    }

    let result = await userService().getUserData(guestId, accessToken);
    if (result.isError()) {
      return;
    }

    const userData = result.value;
    setUserData(userData);
    setAvatar(userService().getProfilePicture(guestId, userData.username));
    return;
  }

  return (
    <View style={styles.container}>
      {
        displayDebugTools && (
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
        )
      }

      {
        isLoggedIn && (
          <View style={styles.loggedIn}>
            <View style={styles.imageCard}>
              <Image source={{ uri: avatar }} style={styles.image} />
            </View>
            <Text style={styles.name}>{userData?.family_name} {userData?.given_name}</Text>
            <Text style={styles.username}> @ {userData?.username}</Text>


            <Text>Last active: {userData?.last_active}</Text>
            <Text>gender: {userData?.gender}</Text>
            <Text>email: {userData?.email}</Text>
            <Text>updated at: {userData?.updated_at}</Text>
            <Text>created at: {userData?.created_at}</Text>
            <Text>birth date: {userData?.birth_date}</Text>

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
