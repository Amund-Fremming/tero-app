import { Pressable, Text, View } from "react-native";
import styles from "./gameScreenStyles";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useEffect, useState } from "react";
import { SpinGameState } from "../../constants/SpinTypes";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import { GameEntryMode } from "@/src/common/constants/types";
import Color from "@/src/common/constants/color";
import { useHubConnectionProvider } from "@/src/common/context/HubConnectionProvider";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { HubChannel } from "@/src/common/constants/hubChannel";
import Screen from "@/src/common/constants/screen";
import { useAuthProvider } from "@/src/common/context/AuthProvider";

export const GameScreen = ({ navigation }: any) => {
  const [challenge, setChallenge] = useState<string>();
  const [gameState, setGameState] = useState<SpinGameState>();
  const [bgColor, setBgColor] = useState<string>(Color.Gray);
  const [state, setState] = useState<SpinGameState>(SpinGameState.RoundStarted);

  const { disconnect, connect, setListener, invokeFunction } = useHubConnectionProvider();
  const { universalGameValues, gameEntryMode } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();
  const { guestId: userId } = useAuthProvider();

  const isHost = gameEntryMode === GameEntryMode.Creator || gameEntryMode === GameEntryMode.Host;

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
