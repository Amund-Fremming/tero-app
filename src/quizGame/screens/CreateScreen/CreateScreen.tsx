import { Text, View } from "react-native";
import styles from "./createScreenStyles";
import Color from "@/src/Common/constants/Color";
import { useState } from "react";
import { CreateGameRequest, GameCategory, GameEntryMode, GameType } from "@/src/Common/constants/Types";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useAuthProvider } from "@/src/Common/context/AuthProvider";
import { useModalProvider } from "@/src/Common/context/ModalProvider";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import AbsoluteHomeButton from "@/src/Common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useServiceProvider } from "@/src/Common/context/ServiceProvider";
import QuizGame from "../../QuizGame";
import { useHubConnectionProvider } from "@/src/Common/context/HubConnectionProvider";
import Screen from "@/src/Common/constants/Screen";

export const CreateScreen = ({ navigation }: any) => {
  const { pseudoId } = useAuthProvider();
  const { displayErrorModal } = useModalProvider();
  const { gameService } = useServiceProvider();
  const { accessToken } = useAuthProvider();
  const { setGameKey, setGameEntryMode, setHubAddress } = useGlobalGameProvider();
  const {} = useHubConnectionProvider();

  const [loading, setLoading] = useState<boolean>(false);
  const [createRequest, setCreateRequest] = useState<CreateGameRequest>({
    name: "",
    description: "",
    category: GameCategory.Random,
  });

  const handleCreateGame = async () => {
    if (loading) {
      return;
    }

    if (!pseudoId) {
      // TODO - handle
      console.error("No pseudo id present");
      displayErrorModal("En feil har skjedd, forsøk å åpne appen på nytt");
      return;
    }

    setLoading(true);
    const result = await gameService().createInteractiveGame(pseudoId, accessToken, GameType.Quiz, createRequest);

    if (result.isError()) {
      displayErrorModal(result.error);
      setLoading(false);
      return;
    }

    setGameKey(result.value.key_word);
    setHubAddress(result.value.hub_address);
    setGameEntryMode(GameEntryMode.Creator);
    navigation.navigate(Screen.SpinGame);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opprett spill</Text>

      <TextInput
        style={styles.input}
        placeholder="Spillnavn"
        value={createRequest.name}
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
