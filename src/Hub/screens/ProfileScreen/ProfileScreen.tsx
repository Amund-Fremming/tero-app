import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./profileScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useEffect, useState } from "react";
import { BaseUser, PatchUserRequest, UserRole } from "@/src/common/constants/types";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Color from "@/src/common/constants/color";
import Screen from "@/src/common/constants/screen";
import { TextInput } from "react-native-gesture-handler";

export const ProfileScreen = () => {
  const navigation: any = useNavigation();

  const { guestId, redirectUri, triggerLogout, accessToken } = useAuthProvider();
  const { userService } = useServiceProvider();

  const isLoggedIn = accessToken != null;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");
  const [userData, setUserData] = useState<BaseUser | undefined>(undefined);
  const [patchRequest, setPatchRequest] = useState<PatchUserRequest>({});

  const crown = require("../../../common/assets/images/crown.png")

  useEffect(() => {
    fetchUserData();
    console.log("Callback url:", redirectUri)
  }, [accessToken])

  const fetchUserData = async () => {
    if (!accessToken) {
      console.warn("No access token present");
      return;
    }

    let result = await userService().getUserData(accessToken);
    if (result.isError()) {
      return;
    }

    const role = result.value.role;
    const userData = result.value.user;
    setIsAdmin(role === UserRole.Admin);
    setUserData(userData);
    setAvatar(userService().getProfilePicture(guestId, userData.username));
    return;
  }

  const handleLogout = async () => {
    const success = await triggerLogout();
    if (success) {
      setUserData(undefined);
      setIsAdmin(false);
      setAvatar("");
    }

    navigation.goBack();
  }

  if (!isLoggedIn) {
    return (
      <View></View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconsBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={32} color={Color.Black} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate(Screen.Admin)} style={styles.adminButton}>
          <Text style={styles.adminText}>dashboard</Text>
        </Pressable>

        {isLoggedIn && (<Pressable onPress={handleLogout}>
          <Feather name="log-out" size={26} color={Color.Black} />
        </Pressable>)}
      </View>

      <View style={styles.loggedIn}>
        <View style={styles.imageCard}>
          {
            isAdmin && (
              <Image source={crown} style={styles.crown} />
            )
          }
          <Image source={{ uri: avatar }} style={styles.image} />
        </View>
        {
          editMode && (
            <Text style={styles.email}>{userData?.email}</Text>
          )
        }
        {
          !editMode && (
            <Text style={styles.name}>{userData?.given_name} {userData?.family_name}</Text>
          )
        }
        <Text style={styles.username}>{editMode ? "" : "@"}{!editMode && userData?.username}</Text>

        {!editMode && (<View style={styles.layover}>
          <Pressable onPress={() => setEditMode(true)} style={styles.bigButton}>
            <View style={styles.iconGuard}>
              <Feather name="edit" size={30} color={Color.Black} />
            </View>
            <Text style={styles.buttonText}>Rediger profil</Text>
            <Feather name="chevron-right" size={24} color={Color.Black} />
          </Pressable>
          <View style={styles.bigButton}>
            <View style={styles.iconGuard}>
              <Feather name="lock" size={28} color={Color.Black} />
            </View>
            <Text style={styles.buttonText}>Bytt passord</Text>
            <Feather name="chevron-right" size={28} color={Color.Black} />
          </View>
          <Pressable onPress={() => navigation.navigate(Screen.TipsUs)} style={styles.bigButton}>
            <View style={styles.iconGuard}>
              <Feather name="sun" size={28} color={Color.Black} />
            </View>
            <Text style={styles.buttonText}>Tips oss</Text>
            <Feather name="chevron-right" size={28} color={Color.Black} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate(Screen.SavedGames)} style={styles.bigButton}>
            <View style={styles.iconGuard}>
              <Feather name="play" size={28} color={Color.Black} />
            </View>
            <Text style={styles.buttonText}>Dine spill</Text>
            <Feather name="chevron-right" size={28} color={Color.Black} />
          </Pressable>
        </View>
        )}
        {editMode && (
          <View style={styles.layoverEdit}>
            <ScrollView
              style={styles.layoverEditScroll}
              contentContainerStyle={styles.layoverEditContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Fornavn</Text>
                <TextInput onChangeText={input => setPatchRequest(prev => ({ ...prev, given_name: input }))} style={styles.input} value={userData?.given_name} placeholder="Skriv inn fornavn" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Etternavn</Text>
                <TextInput onChangeText={input => setPatchRequest(prev => ({ ...prev, family_name: input }))} style={styles.input} value={userData?.family_name} placeholder="Skriv inn etternavn" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Brukernavn</Text>
                <TextInput onChangeText={input => setPatchRequest(prev => ({ ...prev, username: input }))} style={styles.input} value={userData?.username} placeholder="Velg brukernavn" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Fødselsdato</Text>
                <TextInput onChangeText={input => setPatchRequest(prev => ({ ...prev, birth_date: input }))} style={styles.input} value={userData?.birth_date} placeholder="dd.mm.åååå" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Kjønn</Text>
                <TextInput style={styles.input} value={userData?.gender} placeholder="Oppgi kjønn" />
              </View>

              <View style={styles.buttonWrapper}>
                <Pressable style={styles.cancelButton} onPress={() => setEditMode(false)}>
                  <Text style={styles.cancelButtonText}>avbryt</Text>
                </Pressable>
                <Pressable style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>lagre</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        )}
      </View>

    </View>
  )
}

export default ProfileScreen;
