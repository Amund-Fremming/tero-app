import { View, Text } from "react-native";
import styles from "./joinScreenStyles";
import AbsoluteHomeButton from "@/app/Common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { useModalProvider } from "@/app/Common/context/ModalProvider";
import { addPlayerToGame } from "@/app/Common/services/universalGameApi";
import { useUserProvider } from "@/app/Common/context/UserProvider";
import { useGlobalGameProvider } from "../../../Common/context/GlobalGameProvider";
import MediumButton from "../../../Common/components/MediumButton/MediumButton";
import { GameEntryMode } from "../../../Common/constants/Types";

export const JoinScreen = ({ navigation }: any) => {
  const [userInput, setUserInput] = useState<string>("");

  const { userId } = useUserProvider();
  const { displayErrorModal } = useModalProvider();
  const { setUniversalGameValues, setGameEntryMode } = useGlobalGameProvider();

  const handleJoinGame = async () => {
    const universalGameId = Number.parseInt(userInput);
    if (isNaN(universalGameId)) {
      displayErrorModal("Spill id må være ett tall");
      return;
    }

    const result = await addPlayerToGame(userId, universalGameId);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    var game = result.value.gameBase;
    var entryMode = game.isCopy ? GameEntryMode.Member : GameEntryMode.Participant;
    setGameEntryMode(entryMode);
    setUniversalGameValues({
      gameId: game.id,
      universalGameId: game.universalId,
      gameType: result.value.gameType,
      iterations: game.iterations,
    });
    navigation.navigate(result.value.gameType.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bli med</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv inn id"
        value={userInput}
        onChangeText={(input) => setUserInput(input)}
      />
      <MediumButton text="Bli med" color="black" onClick={handleJoinGame} />
      <AbsoluteHomeButton />
    </View>
  );
};

export default JoinScreen;
