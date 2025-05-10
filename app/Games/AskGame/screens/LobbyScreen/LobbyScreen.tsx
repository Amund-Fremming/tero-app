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
import AskScreen from "../../constants/AskScreen";
import { startGame } from "../../services/askGameApi";
import { AskGameState } from "../../constants/AskTypes";

export const LobbyScreen = ({ navigation }: any) => {
  const [question, setQuestion] = useState<string>("");

  const { isCreator, gameId, universalGameId, gameType } = useGlobalGameProvider();
  const { iterations, setIterations, setAskGame } = useAskGameProvider();
  const { connect, disconnect, setListener, invokeFunction } = useHubConnectionProvider();
  const { displayErrorModal } = useInfoModalProvider();

  useEffect(() => {}, [universalGameId]);

  useEffect(() => {
    createHubConnection();
    return () => {
      disconnect();
    };
  }, [gameId]);

  const createHubConnection = async () => {
    if (!gameId) return;

    const result = await connect(gameType, gameId);
    if (result.isErr()) {
      displayErrorModal(result.error);
      return;
    }

    setListener(HubChannel.Iterations, (iterations: number) => {
      console.log(`Received: ${iterations}`); // TODO - remove log
      setIterations(iterations);
    });

    setListener(HubChannel.State, (state: AskGameState) => {
      console.log(`Received: ${state}`); // TODO - remove log
      if (state === AskGameState.Closed) {
        navigation.navigate(AskScreen.Started);
      }
    });

    setListener(HubChannel.Error, (message: string) => {
      console.log(`Received: ${message}`); // TODO - remove log
      disconnect();
      displayErrorModal(message, () => navigation.navigate(Screen.Home));
    });
  };

  const handleAddQuestion = async () => {
    setQuestion("");
    const result = await invokeFunction("AddQuestion", gameId, question);
    if (result.isErr()) {
      displayErrorModal(result.error);
    }
  };

  const handleStartGame = async () => {
    try {
      if (!gameId) return;

      const result = await startGame(gameId);
      if (result.isErr()) {
        displayErrorModal(result.error);
        return;
      }

      setAskGame(result.value);
      await disconnect();
      await navigation.navigate(AskScreen.Game);
    } catch (error) {
      displayErrorModal("En feil skjedde når spillet skulle starte.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Universal game id: {universalGameId}</Text>
      <Text style={styles.header}>Legg til spørsmål</Text>
      <Text style={styles.paragraph}>Antall spørsmål: {iterations}</Text>
      <TextInput style={styles.input} value={question} onChangeText={(input) => setQuestion(input)} />
      <MediumButton text="Legg til" color={Color.Beige} onClick={handleAddQuestion} />
      {isCreator && <MediumButton text="Start" color={Color.Beige} onClick={handleStartGame} inverted />}
      <AbsoluteNavButton label="Hjem" primary="black" secondary="white" destination={Screen.Home} />
    </View>
  );
};

export default LobbyScreen;
