import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./profileScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useEffect, useState } from "react";
import { BaseUser, Gender, PatchUserRequest, UserRole } from "@/src/common/constants/types";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Color from "@/src/common/constants/color";
import Screen from "@/src/common/constants/screen";
import { TextInput } from "react-native-gesture-handler";
import { useModalProvider } from "@/src/common/context/ModalProvider";

export const ProfileScreen = () => {
  const navigation: any = useNavigation();

  const { pseudoId, triggerLogout, accessToken, setPseudoId } = useAuthProvider();
  const { userService } = useServiceProvider();
  const { displayErrorModal } = useModalProvider();

  const isLoggedIn = accessToken != null;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");
  const [userData, setUserData] = useState<BaseUser | undefined>(undefined);
  const [patchRequest, setPatchRequest] = useState<PatchUserRequest>({});
  const [birthDate, setBirthDate] = useState<string>("");

  const crown = require("../../../common/assets/images/crown.png")

  const handleBirthDateChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');

    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = cleaned.slice(0, 2);
      if (cleaned.length >= 4) {
        formatted += '.' + cleaned.slice(2, 4);
        if (cleaned.length >= 8) {
          formatted += '.' + cleaned.slice(4, 8);
        } else if (cleaned.length > 4) {
          formatted += '.' + cleaned.slice(4);
        }
      } else if (cleaned.length > 2) {
        formatted += '.' + cleaned.slice(2);
      }
    }

    if (formatted.length === 10) {
      const [day, month, year] = formatted.split('.').map(Number);
      const date = new Date(year, month - 1, day);

      if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day &&
        day >= 1 && day <= 31 &&
        month >= 1 && month <= 12 &&
        year >= 1900 && year <= new Date().getFullYear()
      ) {
        setBirthDate(formatted);
      }
    } else {
      setBirthDate(formatted);
    }
  }

  useEffect(() => {
    if (!pseudoId) {
      console.error("No user id");
      return;
    }

    setAvatar(userService().getProfilePicture(pseudoId, userData?.username));
    setPatchRequest({
      username: userData?.username,
      gender: userData?.gender,
      family_name: userData?.family_name,
      given_name: userData?.given_name,
      birth_date: userData?.birth_date
    })
  }, [userData]);

  useEffect(() => {
    fetchUserData();
  }, [accessToken])

  const fetchUserData = async () => {
    if (!pseudoId) {
      console.error("No user id");
      return;
    }

    if (!accessToken) {
      console.warn("No access token present");
      return;
    }

    let result = await userService().getUser(accessToken);
    if (result.isError()) {
      return;
    }

    const role = result.value.role;
    const userData = result.value.user;
    setPseudoId(userData.id);
    setIsAdmin(role === UserRole.Admin);
    setUserData(userData);
    setAvatar(userService().getProfilePicture(pseudoId, userData.username));
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

  const handlePatchUser = async () => {
    if (!accessToken) {
      // HANDLE LOGOUT!
      console.error("No access token present");
      return;
    }

    if (!userData) {
      // HANDLE LOGOUT!
      console.error("No user data present");
      return;
    }

    const result = await userService().patchUser(accessToken, userData?.id, patchRequest);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    console.warn(result.value);
    setUserData(result.value);
    setEditMode(false);
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

        {
          isAdmin && (
            <Pressable onPress={() => navigation.navigate(Screen.Admin)} style={styles.adminButton}>
              <Text style={styles.adminText}>dashboard</Text>
            </Pressable>
          )
        }

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
                <TextInput onChangeText={input => setPatchRequest(prev => ({ ...prev, given_name: input }))} style={styles.input} value={patchRequest.given_name} placeholder="Skriv inn fornavn" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Etternavn</Text>
                <TextInput onChangeText={input => setPatchRequest(prev => ({ ...prev, family_name: input }))} style={styles.input} value={patchRequest.family_name} placeholder="Skriv inn etternavn" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Brukernavn</Text>
                <TextInput onChangeText={input => setPatchRequest(prev => ({ ...prev, username: input }))} style={styles.input} value={patchRequest.username} placeholder="Velg brukernavn" />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Fødselsdato</Text>
                <TextInput
                  style={styles.input}
                  value={birthDate}
                  onChangeText={handleBirthDateChange}
                  placeholder="dd.mm.yyyy"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Kjønn</Text>
                <View style={styles.genderButtonContainer}>
                  <Pressable
                    style={[
                      styles.genderButton,
                      patchRequest?.gender === Gender.Male && styles.genderButtonSelected
                    ]}
                    onPress={() => setPatchRequest(prev => ({ ...prev, gender: Gender.Male }))}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      patchRequest?.gender === Gender.Male && styles.genderButtonTextSelected
                    ]}>Mann</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.genderButton,
                      patchRequest?.gender === Gender.Female && styles.genderButtonSelected
                    ]}
                    onPress={() => setPatchRequest(prev => ({ ...prev, gender: Gender.Female }))}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      patchRequest?.gender === Gender.Female && styles.genderButtonTextSelected
                    ]}>Kvinne</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.genderButton,
                      patchRequest?.gender === Gender.Unknown && styles.genderButtonSelected
                    ]}
                    onPress={() => setPatchRequest(prev => ({ ...prev, gender: Gender.Unknown }))}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      (userData == undefined || userData?.gender === Gender.Unknown) && styles.genderButtonTextSelected
                    ]}>Annet</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.buttonWrapper}>
                <Pressable style={styles.cancelButton} onPress={() => setEditMode(false)}>
                  <Text style={styles.cancelButtonText}>avbryt</Text>
                </Pressable>
                <Pressable onPress={handlePatchUser} style={styles.saveButton}>
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
