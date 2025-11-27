import { Pressable, Text, View } from "react-native";
import styles from "./gameScreenStyles";
import AbsoluteHomeButton from "@/src/Common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useEffect, useState } from "react";
import { SpinGameState } from "../../constants/SpinTypes";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import { GameEntryMode } from "@/src/Common/constants/Types";
import Color from "@/src/Common/constants/Color";
import { useHubConnectionProvider } from "@/src/Common/context/HubConnectionProvider";
import { useModalProvider } from "@/src/Common/context/ModalProvider";
import { HubChannel } from "@/src/Common/constants/HubChannel";
import Screen from "@/src/Common/constants/Screen";
import { useAuthProvider } from "@/src/Common/context/AuthProvider";

export const GameScreen = ({ navigation }: any) => {
  const [challenge, setChallenge] = useState<string>();
  const [gameState, setGameState] = useState<SpinGameState>();
  const [bgColor, setBgColor] = useState<string>(Color.Gray);
  const [state, setState] = useState<SpinGameState>(SpinGameState.RoundStarted);

  const { disconnect, connect, setListener, invokeFunction } = useHubConnectionProvider();
  const { gameEntryMode } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();
  const { pseudoId: userId } = useAuthProvider();

  const isHost = gameEntryMode === GameEntryMode.Creator || gameEntryMode === GameEntryMode.Host;

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      {isHost && state === SpinGameState.RoundStarted && (
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Start spin</Text>
        </Pressable>
      )}
      {isHost && state === SpinGameState.RoundFinished && (
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Neste runde</Text>
        </Pressable>
      )}
      <AbsoluteHomeButton />
    </View>
  );
};
