import { View, Text } from "react-native";
import styles from "./lobbyScreenStyles";
import AbsoluteHomeButton from "@/src/Common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import { Pressable } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useHubConnectionProvider } from "@/src/Common/context/HubConnectionProvider";
import { HubChannel } from "@/src/Common/constants/HubChannel";
import { useModalProvider } from "@/src/Common/context/ModalProvider";
import Screen from "@/src/Common/constants/Screen";
import { GameEntryMode } from "@/src/Common/constants/Types";
import { useAuthProvider } from "@/src/Common/context/AuthProvider";
import { SpinGameState } from "../../constants/spinTypes";
import SpinScreen from "../../constants/spinScreen";
import AddChallenge from "../../components/AddChallenge/AddChallenge";

export const LobbyScreen = ({ navigation }: any) => {
  const { pseudoId: userId } = useAuthProvider();
  const { universalGameValues, setIterations, gameEntryMode } = useGlobalGameProvider();
  const { connect, disconnect, setListener, invokeFunction } = useHubConnectionProvider();
  const { displayErrorModal } = useModalProvider();

  useEffect(() => {
    createHubConnection();
    return () => {
      disconnect();
    };
  }, [universalGameValues]);

  const createHubConnection = async () => {
    if (!universalGameValues) {
      return;
    }

    const result = await connect(universalGameValues.gameType, universalGameValues.gameId);
    if (result.isError()) {
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
      console.log(`Received error. ${message}`); // TODO - remove log
      disconnect();
      displayErrorModal(message, () => navigation.navigate(Screen.Home));
    });
  };

  const handleStartGame = async () => {
    if (!userId) {
      displayErrorModal("Noe gikk galt. Forsøk å drepe appen og åpne den på nytt.");
      return;
    }

    if (!universalGameValues) {
      displayErrorModal("Noe gikk galt. Gå ut og inn i spillet.");
      return;
    }

    const result = await invokeFunction("CloseChallenges", userId, universalGameValues.gameId);
    if (result.isError()) {
      displayErrorModal(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Spill id: {universalGameValues?.universalGameId}</Text>
      <Text>Antall challenges: {universalGameValues?.iterations}</Text>
      <Text>LobbyScreen</Text>
      {(gameEntryMode === GameEntryMode.Creator || gameEntryMode === GameEntryMode.Participant) && <AddChallenge />}

      {(gameEntryMode === GameEntryMode.Creator || gameEntryMode === GameEntryMode.Host) && (
        <Pressable>
          <Text onPress={handleStartGame}>Start</Text>
        </Pressable>
      )}
      <AbsoluteHomeButton />
    </View>
  );
};

export default LobbyScreen;
