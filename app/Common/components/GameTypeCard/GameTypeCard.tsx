import { Pressable, Text } from "react-native";
import styles from "./gameTypeCardStyles";
import { useNavigation } from "@react-navigation/native";
import { useGlobalGameProvider } from "../../context/GlobalGameProvider";
import { GameEntryMode, GameType } from "../../constants/Types";
import Screen from "../../constants/Screen";
import { useModalProvider } from "../../context/ModalProvider";

interface GameCardProps {
  header: string;
  description: string;
  icon: string;
  screen: string;
}

export const GameTypeCard = ({ header, description, icon, screen }: GameCardProps) => {
  const navigation: any = useNavigation();
  const { setGameType, gameEntryMode } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();

  const handlePress = () => {
    const creating = gameEntryMode === GameEntryMode.Creator;

    switch (screen) {
      case "AskGame":
        setGameType(GameType.AskGame);
        navigation.navigate(creating ? Screen.AskGame : Screen.GameList);
        break;
      case "SpinGame":
        setGameType(GameType.SpinGame);
        navigation.navigate(creating ? Screen.SpinGame : Screen.GameList);
        break;
      default: {
        displayErrorModal("Noe har gått virkelig galt, prøv igjen");
        navigation.navigate(Screen.Home);
        return;
      }
    }
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.paragraph}>{description}</Text>
    </Pressable>
  );
};

export default GameTypeCard;
