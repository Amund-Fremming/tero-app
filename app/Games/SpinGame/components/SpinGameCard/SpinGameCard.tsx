import { Text, Pressable } from "react-native";
import styles from "./spinGameStyles";

interface AskGameCardProps {
  name: string;
  iterations: number;
  handlePress: () => void;
}

export const SpinGameCard = (props: AskGameCardProps) => {
  return (
    <Pressable style={styles.card} onPress={props.handlePress}>
      <Text style={styles.header}>{props.name}</Text>
      <Text style={styles.iterations}>{props.iterations}</Text>
    </Pressable>
  );
};
