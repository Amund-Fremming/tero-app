import { View, Text } from "react-native";

import styles from "./joinScreenStyles";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useGlobalGameProvider } from "../../../common/context/GlobalGameProvider";
import { GameEntryMode } from "../../../common/constants/types";
import { Feather } from "@expo/vector-icons";
import Color from "@/src/common/constants/color";
import BigButton from "@/src/common/components/BigButton/BigButton";

export const JoinScreen = ({ navigation }: any) => {
  const [userInput, setUserInput] = useState<string>("");

  const { guestId } = useAuthProvider();
  const { displayErrorModal } = useModalProvider();
  const { setUniversalGameValues, setGameEntryMode } = useGlobalGameProvider();

  useEffect(() => {
    setGameEntryMode(GameEntryMode.Participant);
  }, [])

  const handleJoinGame = () => {
    //
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={36} color={Color.OffBlack} />
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.header}>Skriv in kodeordet</Text>
        <View style={styles.inputWrapper}>
          <Feather name="key" size={30} color={Color.OffBlack} />
          <TextInput
            style={styles.input}
            placeholder="SLEM POTET"
            value={userInput}
            onChangeText={(input) => setUserInput(input)}
          />
        </View>
        <BigButton text="Bli med" color={Color.Burgunde} onClick={handleJoinGame} inverted={false} />
      </View>
    </View>
  );
};

export default JoinScreen;
