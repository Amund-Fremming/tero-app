import { Pressable, Text } from "react-native";
import styles from "./absoluteNavButtonStyles";
import Screen from "../../constants/Screen";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Color";

interface AbsoluteNavButtonProps {
  label: string;
  destination: Screen;
  primary: string;
  secondary: string;
}

export const AbsoluteNavButton = ({
  label,
  destination,
  primary,
  secondary,
}: AbsoluteNavButtonProps) => {
  const navigation: any = useNavigation();

  return (
    <Pressable
      style={{ ...styles.button, backgroundColor: primary }}
      onPress={() => navigation.navigate(destination)}
    >
      <Text style={{ ...styles.label, color: secondary }}>{label}</Text>
    </Pressable>
  );
};

export default AbsoluteNavButton;
