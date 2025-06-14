import { Text, View } from "react-native";
import styles from "./createScreenStyles";
import Color from "@/app/Hub/constants/Color";
import { CreateAskGameRequest } from "../../constants/AskTypes";
import { useState } from "react";
import { Category, GameEntryMode, GameType } from "@/app/Hub/constants/Types";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useUserProvider } from "@/app/Hub/context/UserProvider";
import { createGame } from "../../services/askGameApi";
import { useModalProvider } from "@/app/Hub/context/ModalProvider";
import AskScreen from "../../constants/AskScreen";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import AbsoluteHomeButton from "@/app/Hub/components/AbsoluteHomeButton/AbsoluteHomeButton";

export const CreateScreen = ({ navigation }: any) => {
  const { userId } = useUserProvider();
  const { displayErrorModal } = useModalProvider();
  const { setUniversalGameValues } = useGlobalGameProvider();

  const [loading, setLoading] = useState<boolean>(false);
  const [createRequest, setCreateRequest] = useState<CreateAskGameRequest>({
    userId,
    gameName: "",
    description: "",
    category: Category.Random,
  });

  const handleCreateGame = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const result = await createGame(createRequest);
    if (result.isError()) {
      displayErrorModal(result.error);
      setLoading(false);
      return;
    }

    var game = result.value;
    setUniversalGameValues({
      gameId: game.id,
      universalGameId: game.universalId,
      gameType: GameType.AskGame,
      iterations: game.iterations,
    });
    navigation.navigate(AskScreen.Lobby);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opprett spill</Text>

      <TextInput
        style={styles.input}
        placeholder="Spillnavn"
        value={createRequest.gameName}
        onChangeText={(val) => setCreateRequest((prev) => ({ ...prev, gameName: val }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Forklaring"
        value={createRequest.description}
        onChangeText={(val) => setCreateRequest((prev) => ({ ...prev, description: val }))}
      />

      <Text style={styles.paragraph}>Mangler kategorivalg her</Text>

      <Pressable onPress={handleCreateGame}>
        <Text>Opprett</Text>
      </Pressable>

      <AbsoluteHomeButton primary={Color.Beige} secondary={Color.White} />
    </View>
  );
};
