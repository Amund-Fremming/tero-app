import { View, Text } from "react-native";
import styles from "./lobbyScreenStyles";
import AbsoluteHomeButton from "@/app/Hub/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";
import { HubChannel } from "@/app/Hub/constants/HubChannel";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import Screen from "@/app/Hub/constants/Screen";
import CheckBox from "../../components/CheckBox/CheckBox";
import { GameEntryMode } from "@/app/Hub/constants/Types";
import { useUserProvider } from "@/app/Hub/context/UserProvider";
import { SpinGameState } from "../../constants/SpinTypes";
import SpinScreen from "../../constants/SpinScreen";

export const LobbyScreen = ({ navigation }: any) => {
  const [participants, setParticipants] = useState<number>(1);
  const [iterations, setIterations] = useState<number>(0);
  const [readBeforeSpin, setReadBeforeSpin] = useState<boolean>(true);
  const [challenge, setChallenge] = useState<string>("");

  const { userId } = useUserProvider();
  const { gameId, universalGameId, gameType, gameEntryMode } = useGlobalGameProvider();
  const { connect, disconnect, setListener, invokeFunction } = useHubConnectionProvider();
  const { displayErrorModal } = useInfoModalProvider();

  useEffect(() => {
    createHubConnection();
    return () => {
      disconnect();
    };
  }, [gameId]);

  const createHubConnection = async () => {
    if (!gameId) {
      return;
    }

    const result = await connect(gameType, gameId);
    if (result.isErr()) {
      displayErrorModal(result.error, () => navigation.navigate(Screen.Home));
      return;
    }

    setListener(HubChannel.Iterations, (iterations: number) => {
      console.log(`Received: ${iterations}`); // TODO - remove log
      setIterations(iterations);
    });

    setListener(HubChannel.State, (state: SpinGameState) => {
      console.log(`Received: ${state}`); // TODO - remove log
      if (state === SpinGameState.ChallengesClosed) {
        navigation.navigate(SpinScreen.Game);
      }
    });

    setListener(HubChannel.Error, (message: string) => {
      console.log(`Received: ${message}`); // TODO - remove log
      disconnect();
      displayErrorModal(message, () => navigation.navigate(Screen.Home));
    });
  };

  const handleAddChallenge = async () => {
    if (!gameId) {
      displayErrorModal("Noe gikk galt, prøv å gå inn og ut av spillet.");
      return;
    }

    const result = await invokeFunction("AddChallenge", gameId, participants, challenge, readBeforeSpin);
    if (result.isErr()) {
      displayErrorModal(result.error);
    }
  };

  const handleStartGame = async () => {
    if (!userId) {
      displayErrorModal("Noe gikk galt. Forsøk å drepe appen og åpne den på nytt.");
      return;
    }

    if (!gameId) {
      displayErrorModal("Noe gikk galt. Gå ut og inn i spillet.");
      return;
    }

    const result = await invokeFunction("CloseChallenges", userId, gameId);
    if (result.isErr()) {
      displayErrorModal(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Spill id: {universalGameId}</Text>
      <Text>Antall challenges: {iterations}</Text>
      <Text>LobbyScreen</Text>
      <TextInput onChangeText={(input) => setChallenge(input)} placeholder="Challenge ..." />
      <Text>Participants:</Text>
      <View style={styles.participantsWrapper}>
        <Pressable onPress={() => setParticipants(participants - 1 == 0 ? 1 : participants - 1)}>
          <Text style={styles.participantsButton}>-</Text>
        </Pressable>
        <Text>{participants}</Text>
        <Pressable onPress={() => setParticipants(participants + 1 == 4 ? 3 : participants + 1)}>
          <Text style={styles.participantsButton}>+</Text>
        </Pressable>
      </View>
      <View style={styles.selectedWrapper}>
        <Text>Les challenge før spin?</Text>
        <CheckBox checked={readBeforeSpin} onCheck={setReadBeforeSpin} />
      </View>
      <Pressable onPress={handleAddChallenge}>
        <Text>Legg til</Text>
      </Pressable>
      {gameEntryMode === GameEntryMode.Creator && (
        <Pressable>
          <Text onPress={handleStartGame}>Start</Text>
        </Pressable>
      )}
      <AbsoluteHomeButton />
    </View>
  );
};

export default LobbyScreen;
