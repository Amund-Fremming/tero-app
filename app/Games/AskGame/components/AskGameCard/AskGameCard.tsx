import { Text, Pressable } from "react-native";
import styles from "./askGameCardStyles";
import { useNavigation } from "@react-navigation/native";
import AskScreen from "../../constants/AskScreen";

interface AskGameCardProps {
  name: string;
  description: string;
  iterations: number;
}

export const AskGameCard = (props: AskGameCardProps) => {
  const navigation: any = useNavigation();

  const handlePress = () => {
    // TODO: implement
    navigation.navigate(AskScreen.Lobby);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Text style={styles.header}>{props.name}</Text>
      <Text style={styles.paragraph}>{props.description}</Text>
      <Text style={styles.iterations}>{props.iterations}</Text>
    </Pressable>
  );
};
