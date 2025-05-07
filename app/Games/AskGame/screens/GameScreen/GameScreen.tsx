import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { Text, View } from "react-native";
import { useAskGameProvider } from "../../context/AskGameProvider";
import AskGame from "../../constants/AskTypes";
import styles from "./gameScreenStyles";

export const GameScreen = ({ navigation }: any) => {
  const { askGame, setAskGame } = useAskGameProvider();

  const handlePrevPressed = () =>
    setAskGame((prevState: AskGame) => ({
      ...prevState,
      currentIteration: prevState.currentIteration - 1,
    }));

  const handleNextPressed = () =>
    setAskGame((prevState: AskGame) => ({
      ...prevState,
      currentIteration: prevState.currentIteration + 1,
    }));

  return (
    <View style={styles.container}>
      <Text>
        Gjenstående spørsmål:
        {askGame.questions.length - askGame.currentIteration}
      </Text>
      <Text>{askGame.questions[askGame.currentIteration].text}</Text>
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
    </View>
  );
};
