import { Pressable, Text } from "react-native";
import styles from "./absoluteNavButtonStyles";
import Screen from "../../constants/Screen";
import { useNavigation } from "@react-navigation/native";
import { useHubConnectionProvider } from "../../context/HubConnectionProvider";

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

  const { disconnect } = useHubConnectionProvider();

  const handlePress = async () => {
    await disconnect();
    navigation.navigate(destination);
  };

  return (
    <Pressable
      style={{ ...styles.button, backgroundColor: primary }}
      onPress={handlePress}
    >
      <Text style={{ ...styles.label, color: secondary }}>{label}</Text>
    </Pressable>
  );
};

export default AbsoluteNavButton;
