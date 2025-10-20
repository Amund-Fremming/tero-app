import { View, Text } from "react-native";

import styles from "./joinScreenStyles";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useGlobalGameProvider } from "../../../common/context/GlobalGameProvider";
import MediumButton from "../../../common/components/MediumButton/MediumButton";
import { GameEntryMode } from "../../../common/constants/types";

export const JoinScreen = ({ navigation }: any) => {
  const [userInput, setUserInput] = useState<string>("");

  const { guestId: userId } = useAuthProvider();
  const { displayErrorModal } = useModalProvider();
  const { setUniversalGameValues, setGameEntryMode } = useGlobalGameProvider();


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bli med</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv inn id"
        value={userInput}
        onChangeText={(input) => setUserInput(input)}
      />
      <MediumButton text="Bli med" color="black" onClick={() => { }} />
      <AbsoluteHomeButton />
    </View>
  );
};

export default JoinScreen;
