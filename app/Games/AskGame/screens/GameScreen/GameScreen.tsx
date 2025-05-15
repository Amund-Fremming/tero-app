import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { Button, Text, View } from "react-native";
import { useAskGameProvider } from "../../context/AskGameProvider";
import styles from "./gameScreenStyles";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "@/app/Hub/constants/Screen";

export const GameScreen = ({ navigation }: any) => {
  const { askGame, setAskGame } = useAskGameProvider();

  const handlePrevPressed = () => {
    if (!askGame || askGame.currentIteration === 0) {
      return;
    }

    setAskGame((prevState) => ({
      ...prevState!,
      currentIteration: prevState!.currentIteration - 1,
    }));
  };

  const handleNextPressed = () => {
    if (!askGame || askGame.currentIteration + 1 === askGame.iterations) {
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
        {askGame && askGame.questions.length - askGame.currentIteration - 1}
      </Text>
      <Text>{askGame && askGame.questions.length > 0 && askGame.questions[askGame.currentIteration].text}</Text>
      <MediumButton text="Forrige" color={Color.Beige} onClick={handlePrevPressed} />
      <MediumButton text="Neste" color={Color.Beige} onClick={handleNextPressed} inverted />
      <AbsoluteNavButton label="Hjem" primary="black" secondary="white" destination={Screen.Home} />
    </View>
  );
};
