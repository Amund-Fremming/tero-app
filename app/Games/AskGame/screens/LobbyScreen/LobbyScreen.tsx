import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./lobbyScreenStyles";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "@/app/Hub/constants/Screen";
import { useAskGameProvider } from "../../context/AskGameProvider";

export const LobbyScreen = ({ navigation }: any) => {
  const [question, setQuestion] = useState<string>("");

  const { isCreator } = useGlobalGameProvider();
  const { gameId, iterations } = useAskGameProvider();
  const { connection } = useHubConnectionProvider();
  const { displayErrorModal } = useInfoModalProvider();

  const handleAddQuestion = async () => {
    try {
      // TODO - finish this
      if (!connection) {
        console.log("Hva");
        return;
      }

      var result = await connection?.invoke("AddQuestion", gameId, question);
      if (result.isErr()) {
        displayErrorModal(result.error);
        return;
      }
      setQuestion("");
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
      <Text style={styles.paragraph}>Antall spørsmål: {iterations}</Text>
      <TextInput
        style={styles.input}
        value={question}
        onChangeText={(input) => setQuestion(input)}
      />
      <MediumButton
        text="Legg til"
        color={Color.Beige}
        onClick={handleAddQuestion}
      />
      {isCreator && (
        <MediumButton
          text="Start"
          color={Color.Beige}
          onClick={handleStartGame}
          inverted
        />
      )}
      <AbsoluteNavButton
        label="Hjem"
        primary="black"
        secondary="white"
        destination={Screen.Home}
      />
    </View>
  );
};

export default LobbyScreen;
