import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./lobbyScreenStyles";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";
import { useGlobalProvider } from "@/app/Hub/context/GlobalProvider";

export const LobbyScreen = ({ navigation }: any) => {
  const [input, setInput] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(0);

  const { gameId, setGameId } = useGlobalProvider();
  const { connection } = useHubConnectionProvider();

  const { displayErrorModal } = useInfoModalProvider();

  const handleAddQuestion = () => {
    try {
      // TODO
    } catch (error) {
      console.error(error);
      displayErrorModal("Klarte ikke legge til spørsmål.");
    }
  };

  const handleStartGame = () => {
    try {
      // TODO
    } catch (error) {
      console.error(error);
      displayErrorModal("En feil skjedde når spillet skulle starte.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Legg til spørsmål</Text>
      <Text>Antall spørsmål: {questionCount}</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={() => setInput(input)}
      />
      <MediumButton
        text="Legg til"
        color={Color.Beige}
        onClick={handleAddQuestion}
      />
      <MediumButton
        text="Start"
        color={Color.Beige}
        onClick={handleStartGame}
        inverted
      />
    </View>
  );
};

export default LobbyScreen;
