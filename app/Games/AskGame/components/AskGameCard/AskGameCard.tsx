import { Text, Pressable } from "react-native";
import styles from "./askGameCardStyles";
import { useNavigation } from "@react-navigation/native";
import AskScreen from "../../constants/AskScreen";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { GameEntryMode } from "@/app/Hub/constants/Types";
import { getGame } from "../../services/askGameApi";
import { useModalProvider } from "@/app/Hub/context/ModalProvider";
import { useAskGameProvider } from "../../context/AskGameProvider";

interface AskGameCardProps {
  id: number;
  name: string;
  description: string;
  iterations: number;
}

export const AskGameCard = (props: AskGameCardProps) => {
  const navigation: any = useNavigation();

  const { setGameEntryMode } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();
  const { setUniversalGameId, setGameId } = useGlobalGameProvider();
  const { setAskGame } = useAskGameProvider();

  const handlePress = async () => {
    var result = await getGame(props.id);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    setAskGame(result.value);
    setGameId(result.value.id);
    setUniversalGameId(result.value.universalId);
    setGameEntryMode(GameEntryMode.Host);
    navigation.navigate(AskScreen.Game);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Text style={styles.header}>{props.name}</Text>
      <Text style={styles.paragraph}>{props.description}</Text>
      <Text style={styles.iterations}>{props.iterations}</Text>
    </Pressable>
  );
};
