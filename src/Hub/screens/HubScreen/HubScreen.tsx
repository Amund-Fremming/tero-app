import { View, Text, Button, Pressable } from "react-native";
import styles from "./hubScreenStyles";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import Screen from "../../../common/constants/screen";
import { Feather } from "@expo/vector-icons";
import Color from "@/src/common/constants/color";
import { useNavigation } from "expo-router";

export const HubScreen = () => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.header}>Hub</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate(Screen.Profile)}>
          <Feather name="user" size={30} color={Color.Black} />
        </Pressable>
      </View>

      <Button title="Admin dashboard" onPress={() => navigation.navigate(Screen.Admin)} />
      <Button title="Saved games" onPress={() => navigation.navigate(Screen.SavedGames)} />
    </View>
  );
};

export default HubScreen;
