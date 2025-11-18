import Color from "@/src/common/constants/color";
import MediumButton from "@/src/common/components/MediumButton/MediumButton";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./lobbyScreenStyles";
import { useHubConnectionProvider } from "@/src/common/context/HubConnectionProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import Screen from "@/src/common/constants/screen";
import { HubChannel } from "@/src/common/constants/hubChannel";
import AskScreen from "../../constants/quizScreen";
import { AskGame, AskGameState } from "../../constants/spinTypes";
import { GameEntryMode } from "@/src/common/constants/types";
import { useQuizGameProvider } from "../../context/AskGameProvider";

export const LobbyScreen = ({ navigation }: any) => {
  const [question, setQuestion] = useState<string>("");

  const { gameEntryMode, universalGameValues, setIterations } = useGlobalGameProvider();
  const { connect, disconnect, setListener, invokeFunction } = useHubConnectionProvider();
  const { displayErrorModal } = useModalProvider();
  const { setQuizGame: setAskGame } = useQuizGameProvider();

  useEffect(() => {
    if (universalGameValues) {
      createHubConnection();
    }
  }, [universalGameValues]);

  const createHubConnection = async () => {
    if (!universalGameValues) return;

    const result = await connect(universalGameValues.gameType, universalGameValues.gameId);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    setListener(HubChannel.Iterations, (iterations: number) => {
      console.log(`Received: ${iterations}`); // TODO - remove log
      setIterations(iterations);
    });

    setListener(HubChannel.State, (state: AskGameState) => {
      console.log(`Received: ${state}`); // TODO - remove log
      if (state === AskGameState.Closed && gameEntryMode !== GameEntryMode.Creator) {
        navigation.navigate(AskScreen.Started);
      }
    });

    setListener(HubChannel.Error, (message: string) => {
      console.log(`Received: ${message}`); // TODO - remove log
      disconnect();
      displayErrorModal(message, () => navigation.navigate(Screen.Home));
    });

    setListener(HubChannel.Game, async (game: AskGame) => {
      setAskGame(game);
      await disconnect();
      await navigation.navigate(AskScreen.Game);
    });
  };

  const handleAddQuestion = async () => {
    if (!universalGameValues) {
      displayErrorModal("Finner ikke spill verdier, noe har gått galt 1.");
      return;
    }

    setQuestion("");
    const result = await invokeFunction("AddQuestion", universalGameValues.gameId, question);
    if (result.isError()) {
      displayErrorModal(result.error);
    }
  };

  const handleStartGame = async () => {
    if (!universalGameValues) {
      displayErrorModal("Finner ikke spill verdier, noe har gått galt 2.");
      return;
    }
    const result = invokeFunction("StartGame", universalGameValues.gameId);
  };

  return (
    <View style={styles.container}>
      <Text>Universal game id: {universalGameValues?.universalGameId}</Text>
      <Text style={styles.header}>Legg til spørsmål</Text>
      <Text style={styles.paragraph}>Antall spørsmål: {universalGameValues?.iterations}</Text>
      <TextInput style={styles.input} value={question} onChangeText={(input) => setQuestion(input)} />
      <MediumButton text="Legg til" color={Color.Beige} onClick={handleAddQuestion} />
      {gameEntryMode === GameEntryMode.Creator && (
        <MediumButton text="Start" color={Color.Beige} onClick={handleStartGame} inverted />
      )}
      <AbsoluteHomeButton />
    </View>
  );
};

export default LobbyScreen;
