import { Text, Pressable } from "react-native";
import styles from "./askGameCardStyles";
import { useNavigation } from "@react-navigation/native";
import AskScreen from "../../constants/AskScreen";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { GameEntryMode, GameType } from "@/app/Hub/constants/Types";
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

  const { displayErrorModal } = useModalProvider();
  const { setUniversalGameValues, universalGameValues } = useGlobalGameProvider();
  const { setAskGame } = useAskGameProvider();

  const handlePress = async () => {
    var result = await getGame(props.id);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    const game = result.value;
    setAskGame(game);
    setUniversalGameValues({
      gameId: game.id,
      universalGameId: Number.parseInt("1" + game),
      gameType: GameType.AskGame,
      iterations: game.iterations,
    });
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
