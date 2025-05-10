import { Text, View } from "react-native";
import styles from "./createScreenStyles";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Color from "@/app/Hub/constants/Color";
import Screen from "@/app/Hub/constants/Screen";
import { CreateAskGameRequest } from "../../constants/AskTypes";
import { useState } from "react";
import { Category } from "@/app/Hub/constants/Types";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useUserProvider } from "@/app/Hub/context/UserProvider";
import { createGame } from "../../services/askGameApi";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import AskScreen from "../../constants/AskScreen";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";

export const CreateScreen = ({ navigation }: any) => {
  const { userId: guestUserId } = useUserProvider();
  const { displayErrorModal } = useInfoModalProvider();
  const { setGameId, setUniversalGameId } = useGlobalGameProvider();

  const [createRequest, setCreateRequest] = useState<CreateAskGameRequest>({
    userId: guestUserId,
    gameName: "",
    description: "",
    category: Category.Random,
  });

  const handleCreateGame = async () => {
    const result = await createGame(createRequest);
    if (result.isErr()) {
      displayErrorModal(result.error);
      return;
    }

    setGameId(result.value.gameId);
    setUniversalGameId(result.value.universalGameId);
    navigation.navigate(AskScreen.Lobby);
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

      <AbsoluteNavButton primary={Color.Beige} secondary={Color.White} destination={Screen.Home} label="Home" />
    </View>
  );
};
