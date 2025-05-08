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

export const JoinScreen = ({ navigation }: any) => {
  const [userInput, setUserInput] = useState<string>("");

  const { guestUserId } = useUserProvider();
  const { displayErrorModal } = useInfoModalProvider();
  const { connect } = useHubConnectionProvider();
  const { setGameId, setGameType } = useGlobalGameProvider();

  const handleJoinGame = async () => {
    var universalGameId = Number.parseInt(userInput);
    if (isNaN(universalGameId)) {
      displayErrorModal("Spill id må være ett tall");
      return;
    }

    const result = await addPlayerToGame(guestUserId, universalGameId);
    if (result.isErr()) {
      displayErrorModal(result.error.message);
      return;
    }

    var connectResult = connect(result.value.gameType, result.value.gameId);
    if (connectResult.isErr()) {
      displayErrorModal(connectResult.error);
      return;
    }

    setGameId(result.value.gameId);
    setGameType(result.value.gameType);
    navigation.navigate(result.value.gameType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bli med</Text>

      <TextInput
        placeholder="Skriv inn id"
        value={userInput}
        onChangeText={(input) => setUserInput(input)}
      />

      <Pressable onPress={handleJoinGame}>
        <Text>Bli med</Text>
      </Pressable>

      <AbsoluteNavButton
        label="Hjem"
        destination={Screen.Home}
        primary={Colors.Black}
        secondary={Colors.Red}
      />
    </View>
  );
};

export default JoinScreen;
