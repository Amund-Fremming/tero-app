import { Text, View } from "react-native";
import styles from "./createScreenStyles";
import { createGame } from "../../services/spinGameApi";
import { useState } from "react";
import { CreateSpinGameRequest } from "../../constants/SpinTypes";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";
import { useGlobalGameProvider } from "@/app/Hub/context/GlobalGameProvider";
import { useUserProvider } from "@/app/Hub/context/UserProvider";
import { Category } from "@/app/Hub/constants/Types";
import { Pressable, TextInput } from "react-native-gesture-handler";
import SpinScreen from "../../constants/SpinScreen";

export const CreateScreen = ({ navigation }: any) => {
  const { setGameId, setUniversalGameId } = useGlobalGameProvider();
  const { displayErrorModal } = useInfoModalProvider();
  const { userId } = useUserProvider();

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

    setGameId(result.value.gameId);
    setUniversalGameId(result.value.universalGameId);
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
    </View>
  );
};

export default CreateScreen;
