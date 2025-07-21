import { Pressable, Text } from "react-native";
import styles from "./gameCardStyles";
import { useNavigation } from "@react-navigation/native";

interface GameCardProps {
  header: string;
  description: string;
  icon: string;
  screen: string;
}

export const GameCard = ({ header, description, icon, screen }: GameCardProps) => {
  const navigation: any = useNavigation();

  return (
    <Pressable style={styles.card} onPress={() => navigation.navigate(screen)}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.paragraph}>{description}</Text>
    </Pressable>
  );
};

export default GameCard;
