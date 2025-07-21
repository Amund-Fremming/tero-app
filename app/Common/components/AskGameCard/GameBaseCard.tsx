import { Text, Pressable } from "react-native";
import styles from "./gameBaseCardStyles";
import { useNavigation } from "@react-navigation/native";
import { GameBase } from "@/app/Common/constants/Types";

interface GameBaseCardProps {
  gameBase: GameBase;
  handlePress: () => void;
}

export const GameBaseCard = ({ gameBase, handlePress }: GameBaseCardProps) => {
  const navigation: any = useNavigation();

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Text style={styles.header}>{gameBase.name}</Text>
      <Text style={styles.iterations}>{gameBase.iterations}</Text>
    </Pressable>
  );
};

export default GameBaseCard;
