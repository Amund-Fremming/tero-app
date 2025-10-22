import { Pressable, Text } from "react-native";
import styles from "./absoluteHomeButtonStyles";
import Screen from "../../constants/screen";
import { useNavigation } from "@react-navigation/native";
import { useHubConnectionProvider } from "@/src/common/context/HubConnectionProvider";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import { useQuizGameProvider } from "@/src/quizGame/context/AskGameProvider";
import Color from "../../constants/color";

interface AbsoluteHomeButtonProps {
  primary?: string;
  secondary?: string;
}

export const AbsoluteHomeButton = ({ primary = Color.Black, secondary = Color.White }: AbsoluteHomeButtonProps) => {
  const navigation: any = useNavigation();

  const { disconnect } = useHubConnectionProvider();
  const { clearQuizGameValues: clearAskValues } = useQuizGameProvider();
  const { clearValues } = useGlobalGameProvider();

  const handlePress = async () => {
    clearValues();
    clearAskValues();
    await disconnect();
    navigation.navigate(Screen.Home);
  };

  return (
    <Pressable style={{ ...styles.button, backgroundColor: primary }} onPress={handlePress}>
      <Text style={{ ...styles.label, color: secondary }}>Hjem</Text>
    </Pressable>
  );
};

export default AbsoluteHomeButton;
