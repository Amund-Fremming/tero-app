import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./editProfileScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useEffect, useState } from "react";
import { BaseUser, Gender, PatchUserRequest } from "@/src/common/constants/types";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Color from "@/src/common/constants/color";
import { TextInput } from "react-native-gesture-handler";
import { useModalProvider } from "@/src/common/context/ModalProvider";

export const EditProfileScreen = () => {
  const navigation: any = useNavigation();

  const { accessToken } = useAuthProvider();
  const { userService } = useServiceProvider();
  const { displayErrorModal } = useModalProvider();

  const [userData, setUserData] = useState<BaseUser | undefined>(undefined);
  const [patchRequest, setPatchRequest] = useState<PatchUserRequest>({});
  const [birthDate, setBirthDate] = useState<string>("");

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
    fetchUserData();
  }, [accessToken])

  useEffect(() => {
    setPatchRequest({
      username: userData?.username,
      gender: userData?.gender,
      family_name: userData?.family_name,
      given_name: userData?.given_name,
      birth_date: userData?.birth_date
    })
  }, [userData]);

  const fetchUserData = async () => {
    if (!accessToken) {
      console.warn("No access token present");
      return;
    }

    let result = await userService().getUser(accessToken);
    if (result.isError()) {
      return;
    }

    const userData = result.value.user;
    setUserData(userData);
    return;
  }

  const handlePatchUser = async () => {
    if (!accessToken) {
      console.error("No access token present");
      return;
    }

    if (!userData) {
      console.error("No user data present");
      return;
    }

    const result = await userService().patchUser(accessToken, userData?.id, patchRequest);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    console.warn(result.value);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconsBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={32} color={Color.Black} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.email}>{userData?.email}</Text>
        <Text style={styles.username}></Text>

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
              <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>avbryt</Text>
              </Pressable>
              <Pressable onPress={handlePatchUser} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>lagre</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default EditProfileScreen;
