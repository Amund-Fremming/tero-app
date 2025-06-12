import { Pressable, Text, View } from "react-native";
import styles from "./gameScreenStyles";
import AbsoluteHomeButton from "@/app/Hub/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useEffect, useState } from "react";
import { SpinGameState } from "../../constants/SpinTypes";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { GameEntryMode } from "@/app/Hub/constants/Types";
import Color from "@/app/Hub/constants/Color";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";
import { useModalProvider } from "@/app/Hub/context/ModalProvider";
import { HubChannel } from "@/app/Hub/constants/HubChannel";
import Screen from "@/app/Hub/constants/Screen";
import { useUserProvider } from "@/app/Hub/context/UserProvider";

export const GameScreen = ({ navigation }: any) => {
  const [challenge, setChallenge] = useState<string>();
  const [gameState, setGameState] = useState<SpinGameState>();
  const [bgColor, setBgColor] = useState<string>(Color.Gray);
  const [state, setState] = useState<SpinGameState>(SpinGameState.RoundStarted);

  const { disconnect, connect, setListener, invokeFunction } = useHubConnectionProvider();
  const { universalGameValues } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();
  const { userId } = useUserProvider();

  const isHost =
    universalGameValues?.gameEntryMode === GameEntryMode.Creator ||
    universalGameValues?.gameEntryMode === GameEntryMode.Host;

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

    setListener(HubChannel.Game, (playerId: number) => {
      console.log(`Received: ${playerId}`);
      setBgColor(userId === playerId ? Color.Green : Color.Red);
    });

    setListener(HubChannel.Message, (challenge: string) => {
      console.log(`Received: ${challenge}`);
      setChallenge(challenge);
    });

    setListener(HubChannel.State, (state: SpinGameState) => {
      console.log(`Received: ${state}`); // TODO - remove log
      setState(state);
      if (state === SpinGameState.RoundStarted) {
        setBgColor(Color.Gray);
      }
    });

    setListener(HubChannel.Error, (message: string) => {
      console.log(`Received error. ${message}`); // TODO - remove log
      disconnect();
      displayErrorModal(message, () => navigation.navigate(Screen.Home));
    });
  };

  const handleStartRound = async () => {
    const result = await invokeFunction("StartRound", userId, universalGameValues?.gameId);
    if (result.isError()) {
      displayErrorModal(result.error);
    }
  };

  const handleStartSpin = async () => {
    const result = await invokeFunction("StartSpin", userId, universalGameValues?.gameId);
    if (result.isError()) {
      displayErrorModal(result.error);
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      {isHost && state === SpinGameState.RoundStarted && (
        <Pressable style={styles.button} onPress={handleStartSpin}>
          <Text style={styles.buttonText}>Start spin</Text>
        </Pressable>
      )}
      {isHost && state === SpinGameState.RoundFinished && (
        <Pressable style={styles.button} onPress={handleStartRound}>
          <Text style={styles.buttonText}>Neste runde</Text>
        </Pressable>
      )}
      <AbsoluteHomeButton />
    </View>
  );
};
