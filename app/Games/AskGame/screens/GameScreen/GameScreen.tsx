import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { Button, Text, View } from "react-native";
import { useAskGameProvider } from "../../context/AskGameProvider";
import styles from "./gameScreenStyles";
import { useEffect, useState } from "react";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "@/app/Hub/constants/Screen";
import { useHubConnectionProvider } from "@/app/Hub/context/HubConnectionProvider";

export const GameScreen = ({ navigation }: any) => {
  const { askGame, setAskGame } = useAskGameProvider();
  const { connection } = useHubConnectionProvider();

  const handlePrevPressed = () => {
    if (!askGame || askGame.currentIteration === 1) {
      return;
    }

    setAskGame((prevState) => ({
      ...prevState!,
      currentIteration: prevState!.currentIteration - 1,
    }));
  };

  const handleNextPressed = () => {
    if (!askGame || askGame.currentIteration === askGame.iterations) {
      return;
    }

    setAskGame((prevState) => ({
      ...prevState!,
      currentIteration: prevState!.currentIteration + 1,
    }));
  };

  return (
    <View style={styles.container}>
      <Text>
        Gjenstående spørsmål:
        {askGame && askGame.questions.length - askGame.currentIteration}
      </Text>
      <Text>
        {askGame &&
          askGame.questions.length > 0 &&
          askGame.questions[askGame.currentIteration - 1].text}
      </Text>
      <MediumButton
        text="Forrige"
        color={Color.Beige}
        onClick={handlePrevPressed}
      />
      <MediumButton
        text="Neste"
        color={Color.Beige}
        onClick={handleNextPressed}
        inverted
      />

      <Button
        title="log"
        onPress={() => {
          console.log("connection is undefined: ", connection == undefined);
        }}
      />

      <AbsoluteNavButton
        label="Hjem"
        primary="black"
        secondary="white"
        destination={Screen.Home}
      />
    </View>
  );
};
