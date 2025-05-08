import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./lobbyScreenStyles";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "@/app/Hub/constants/Screen";
import { useAskGameProvider } from "../../context/AskGameProvider";
import { HubChannel } from "@/app/Hub/constants/HubChannel";
import { AskGameState } from "../../constants/AskTypes";
import AskScreen from "../../constants/AskScreen";

export const LobbyScreen = ({ navigation }: any) => {
  const [question, setQuestion] = useState<string>("");

  const { isCreator, gameId, gameType } = useGlobalGameProvider();
  const { iterations, setIterations } = useAskGameProvider();
  const { connect, disconnect, connection } = useHubConnectionProvider();
  const { displayErrorModal } = useInfoModalProvider();

  useEffect(() => {
    if (gameId == -1) {
      return;
    }

    createHubConnection();
    return disconnect();
  }, [gameId]);

  const createHubConnection = () => {
    var result = connect(gameType, gameId);

    if (result.isErr()) {
      displayErrorModal("Tilkoblingen feilet, sjekk forbindelsen din.");
      return;
    }

    var hubConnection = result.value;

    hubConnection.on("Iterations", (iterations: number) => {
      console.log(`Received: ${iterations}`); // TODO - remove log
      setIterations(iterations);
    });

    hubConnection.on(HubChannel.State, (state: AskGameState) => {
      console.log(`Received: ${state}`); // TODO - remove log
      if (state === AskGameState.Closed) {
        navigation.navigate(AskScreen.Started);
      }
    });

    hubConnection.on(HubChannel.Error, (message: string) => {
      console.log(`Received: ${message}`); // TODO - remove log
      displayErrorModal(message, () => navigation.navigate(Screen.Home));
    });
  };

  useEffect(() => {}, []);

  const handleAddQuestion = async () => {
    try {
      await connection?.invoke("AddQuestion", gameId, question);
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

      <Button
        title="Log"
        onPress={() => {
          console.log("GameId: ", gameId);
          console.log("Is connection: ", connection ? true : false);
          console.log("Iterations: ", iterations);
        }}
      />
    </View>
  );
};

export default LobbyScreen;
