import { View, Text, TouchableOpacity } from "react-native";

import styles from "./joinScreenStyles";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useGlobalGameProvider } from "../../../common/context/GlobalGameProvider";
import { Feather } from "@expo/vector-icons";
import Color from "@/src/common/constants/color";
import BigButton from "@/src/common/components/BigButton/BigButton";
import { GameEntryMode } from "@/src/common/constants/types";

export const JoinScreen = ({ navigation }: any) => {
  const [userInput, setUserInput] = useState<string>("");

  const { pseudoId: guestId } = useAuthProvider();
  const { displayErrorModal } = useModalProvider();
  const {  setGameEntryMode } = useGlobalGameProvider();

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
        <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
          <Text style={styles.buttonText}>Bli med</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinScreen;
