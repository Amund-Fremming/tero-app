import { Button, Image, Pressable, Text, View } from "react-native";
import { styles } from "./profileScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useEffect, useState } from "react";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { User } from "@/src/common/constants/types";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Color from "@/src/common/constants/color";
import Screen from "@/src/common/constants/screen";

export const ProfileScreen = () => {
  const navigation: any = useNavigation();

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

  const handleEditProfile = () => {
    //
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconsBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={32} color={Color.Black} />
        </Pressable>
        {isLoggedIn && (<Pressable onPress={triggerLogout}>
          <Feather name="log-out" size={26} color={Color.Black} />
        </Pressable>)}
      </View>

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
            <View style={styles.layover}>
              <View style={styles.bigButton}>
                <View style={styles.iconGuard}>
                  <Feather name="edit" size={30} color={Color.Black} />
                </View>
                <Text style={styles.buttonText}>Rediger profil</Text>
                <Feather name="chevron-right" size={24} color={Color.Black} />
              </View>
              <View style={styles.bigButton}>
                <View style={styles.iconGuard}>
                  <Feather name="lock" size={28} color={Color.Black} />
                </View>
                <Text style={styles.buttonText}>Bytt passord</Text>
                <Feather name="chevron-right" size={28} color={Color.Black} />
              </View>
              <View style={styles.bigButton}>
                <View style={styles.iconGuard}>
                  <Feather name="settings" size={28} color={Color.Black} />
                </View>
                <Text style={styles.buttonText}>Innstillinger</Text>
                <Feather name="chevron-right" size={28} color={Color.Black} />
              </View>
              <Pressable onPress={() => navigation.navigate(Screen.TipsUs)} style={styles.bigButton}>
                <View style={styles.iconGuard}>
                  <Feather name="sun" size={28} color={Color.Black} />
                </View>
                <Text style={styles.buttonText}>Tips oss!</Text>
                <Feather name="chevron-right" size={28} color={Color.Black} />
              </Pressable>
            </View>
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
    </View>
  );
};

export default ProfileScreen;
