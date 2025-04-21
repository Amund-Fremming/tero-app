import { Pressable, Text } from "react-native";
import styles from "./gameCardStyles";

interface GameCardProps {
  header: string;
  description: string;
  icon: string;
}

export const GameCard = ({ header, description, icon }: GameCardProps) => {
  return (
    <Pressable style={styles.card}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.paragraph}>{description}</Text>
    </Pressable>
  );
};

export default GameCard;
