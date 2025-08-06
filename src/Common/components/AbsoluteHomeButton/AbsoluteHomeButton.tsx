import { Pressable, Text } from "react-native";
import styles from "./absoluteHomeButtonStyles";
import Screen from "@/src/Common/constants/Screen";
import { useNavigation } from "@react-navigation/native";
import { useHubConnectionProvider } from "@/src/Common/context/HubConnectionProvider";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import { useAskGameProvider } from "@/src/AskGame/context/AskGameProvider";
import Color from "../../constants/Color";

interface AbsoluteHomeButtonProps {
  primary?: string;
  secondary?: string;
}

export const AbsoluteHomeButton = ({ primary = Color.Black, secondary = Color.White }: AbsoluteHomeButtonProps) => {
  const navigation: any = useNavigation();

  const { disconnect } = useHubConnectionProvider();
  const { clearAskValues } = useAskGameProvider();
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
