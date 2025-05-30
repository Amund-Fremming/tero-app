import { Text, Pressable } from "react-native";
import styles from "./spinGameStyles";
import { useNavigation } from "@react-navigation/native";
import SpinScreen from "../../constants/SpinScreen";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { GameEntryMode } from "@/app/Hub/constants/Types";
import { getGame } from "@/app/Games/AskGame/services/askGameApi";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import { useAskGameProvider } from "@/app/Games/AskGame/context/AskGameProvider";

interface AskGameCardProps {
  id: number;
  name: string;
  iterations: number;
}

export const SpinGameCard = (props: AskGameCardProps) => {
  const navigation: any = useNavigation();

  const { setGameEntryMode } = useGlobalGameProvider();
  const { displayErrorModal } = useInfoModalProvider();
  const { setAskGame } = useAskGameProvider();

  const handlePress = async () => {
    var result = await getGame(props.id);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    setAskGame(result.value);
    setGameEntryMode(GameEntryMode.Host);
    navigation.navigate(SpinScreen.Game);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Text style={styles.header}>{props.name}</Text>
      <Text style={styles.iterations}>{props.iterations}</Text>
    </Pressable>
  );
};
