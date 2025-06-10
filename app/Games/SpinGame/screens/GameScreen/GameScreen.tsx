import { Text, View } from "react-native";
import styles from "./gameScreenStyles";
import AbsoluteHomeButton from "@/app/Hub/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useState } from "react";
import { SpinGameState } from "../../constants/SpinTypes";

export const GameScreen = ({ navigation }: any) => {
  const [challenge, setChallenge] = useState<string>();
  const [gameState, setGameState] = useState<SpinGameState>();

  return (
    <View style={styles.container}>
      <Text>GameScreen</Text>

      {gameState === SpinGameState.RoundStarted}

      <AbsoluteHomeButton />
    </View>
  );
};
