import { View, Text, Button } from "react-native";
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
import { Challenge } from "../../constants/SpinTypes";

export const LobbyScreen = ({ navigation }: any) => {
  const [participants, setParticipants] = useState<number>(1);
  const [iterations, setIterations] = useState<number>(0);
  const [readBeforeSpin, setReadBeforeSpin] = useState<boolean>(true);
  const [challenge, setChallenge] = useState<string>("");

  const { gameId, universalGameId, gameType } = useGlobalGameProvider();
  const { connect, disconnect, setListener } = useHubConnectionProvider();
  const { displayErrorModal } = useInfoModalProvider();

  useEffect(() => {
    createHubConnection();
    () => {
      disconnect();
    };
  }, [gameId]);

  const createHubConnection = async () => {
    if (!gameId) return;

    const result = await connect(gameType, gameId);
    if (result.isErr()) {
      displayErrorModal(result.error, () => navigation.navigate(Screen.Home));
      return;
    }

    setListener(HubChannel.Iterations, (iterations: number) => {
      console.log(`Received: ${iterations}`); // TODO - remove log
      setIterations(iterations);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Spill id: {universalGameId}</Text>
      <Text>Antall challenges: {iterations}</Text>
      <Text>LobbyScreen</Text>
      <Button title="Start" />
      <TextInput placeholder="Challenge" />
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
      <AbsoluteHomeButton />
    </View>
  );
};

export default LobbyScreen;
