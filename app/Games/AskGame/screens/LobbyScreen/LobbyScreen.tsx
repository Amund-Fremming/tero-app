import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./lobbyScreenStyles";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { HubChannel } from "@/app/Hub/constants/HubChannel";
import { AskGameState } from "../../constants/AskTypes";
import AskScreen from "../../constants/AskScreen";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "@/app/Hub/constants/Screen";

export const LobbyScreen = ({ navigation }: any) => {
  const [question, setQuestion] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(0);

  const { gameId, isCreator: isHost } = useGlobalGameProvider();
  const { connection } = useHubConnectionProvider();

  const { displayInfoModal, displayErrorModal } = useInfoModalProvider();

  useEffect(() => {
    connection?.on(HubChannel.Message, (message: string) => {
      console.log(`Received: ${message}`); // TODO - remove log
      displayInfoModal(message);
    });

    connection?.on(HubChannel.Iterations, (iterations: number) => {
      console.log(`Received: ${iterations}`); // TODO - remove log
      setQuestionCount(iterations);
    });

    connection?.on(HubChannel.State, (state: AskGameState) => {
      console.log(`Received: ${state}`); // TODO - remove log
      if (state === AskGameState.Closed) {
        navigation.navigate(AskScreen.Started);
      }
    });

    connection?.on(HubChannel.Error, (message: string) => {
      console.log(`Received: ${message}`); // TODO - remove log
      displayErrorModal(message);
    });
  }, []);

  const handleAddQuestion = async () => {
    try {
      // TODO - finish this
      var result = await connection?.invoke("AddQuestion", gameId, question);

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
      <Text style={styles.paragraph}>Antall spørsmål: {questionCount}</Text>
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
      {isHost && (
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
