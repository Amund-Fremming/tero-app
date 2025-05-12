import { View, Text } from "react-native";
import styles from "./joinScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../constants/Screen";
import Colors from "../../constants/Color";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { useInfoModalProvider } from "../../context/InfoModalProvider";
import { addPlayerToGame } from "../../services/universalGameApi";
import { useUserProvider } from "../../context/UserProvider";
import { useHubConnectionProvider } from "../../context/HubConnectionProvider";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import MediumButton from "../../components/MediumButton/MediumButton";

export const JoinScreen = ({ navigation }: any) => {
  const [userInput, setUserInput] = useState<string>("");

  const { userId } = useUserProvider();
  const { displayErrorModal } = useInfoModalProvider();
  const { setGameId, setUniversalGameId, setGameType } = useGlobalGameProvider();

  const handleJoinGame = async () => {
    const universalGameId = Number.parseInt(userInput);
    if (isNaN(universalGameId)) {
      displayErrorModal("Spill id må være ett tall");
      return;
    }

    const result = await addPlayerToGame(userId, universalGameId);
    if (result.isErr()) {
      displayErrorModal(result.error);
      return;
    }

    setGameId(result.value.gameId);
    setUniversalGameId(universalGameId);
    setGameType(result.value.gameType);
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

      <AbsoluteNavButton label="Hjem" destination={Screen.Home} primary={Colors.Black} secondary={Colors.Red} />
    </View>
  );
};

export default JoinScreen;
