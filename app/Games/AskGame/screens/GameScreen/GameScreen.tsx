import Color from "@/app/Hub/constants/Color";
import MediumButton from "@/app/Hub/components/MediumButton/MediumButton";
import { Text, View } from "react-native";
import { useSpinGameProvider } from "../../../SpinGame/context/SpinGameProvider";
import { useAskGameProvider } from "../../context/AskGameProvider";
import { useState } from "react";

export const GameScreen = ({ navigation }: any) => {
  const [questionsRemaining, setQuestionsRemaining] = useState<number>(0);

  const { askGame } = useAskGameProvider();

  const handlePrevPressed = () => {
    // TODO
  };

  const handleNextPressed = () => {
    // TODO
  };

  return (
    <View>
      <Text>{questionsRemaining}</Text>
      <Text>Spillet er i gang</Text>
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
