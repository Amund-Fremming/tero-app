import { Text, View } from "react-native";
import styles from "./createScreenStyles";
import { createGame } from "../../services/spinGameApi";
import { useState } from "react";
import { CreateSpinGameRequest } from "../../constants/spinTypes";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { Category, GameType } from "@/src/common/constants/Types";
import { Pressable, TextInput } from "react-native-gesture-handler";
import SpinScreen from "../../constants/spinScreen";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";

export const CreateScreen = ({ navigation }: any) => {
  const { setUniversalGameValues } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();
  const { guestId: userId } = useAuthProvider();

  const [createRequest, setCreateRequest] = useState<CreateSpinGameRequest>({
    userId,
    name: "",
    category: Category.Random,
  });

  const handleCreate = async () => {
    const result = await createGame(createRequest);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    const game = result.value;
    setUniversalGameValues({
      gameId: game.id,
      universalGameId: game.universalId,
      gameType: GameType.SpinGame,
      iterations: game.iterations,
    });
    navigation.navigate(SpinScreen.Lobby);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opprett spill</Text>
      <TextInput
        placeholder="Spill navn"
        onChangeText={(input) => setCreateRequest((prev) => ({ ...prev, name: input }))}
      />
      <Text style={styles.paragraph}>Mangler kategorivalg her</Text>

      <Pressable onPress={handleCreate}>
        <Text>Opprett</Text>
      </Pressable>

      <AbsoluteHomeButton />
    </View>
  );
};

export default CreateScreen;
