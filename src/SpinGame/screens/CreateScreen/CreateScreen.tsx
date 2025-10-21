import { Pressable, Text, TextInput, View } from "react-native";
import styles from "./createScreenStyles";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { PLATFORM_URL_BASE } from "@/src/common/constants/endpoints";
import { GameService } from "@/src/common/services/gameService";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { CreateGameRequest, GameType } from "@/src/common/constants/types";
import SpinGame from "../../SpinGame";
import { useState } from "react";
import { CreateAskGameRequest } from "@/src/quizGame/constants/askTypes";

const service = new GameService(PLATFORM_URL_BASE);

export const CreateScreen = ({ navigation }: any) => {
  const { setUniversalGameValues } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();
  const { guestId, accessToken } = useAuthProvider();

  const [request, setRequest] = useState<CreateGameRequest>({ name: "" });

  const handleCreate = async () => {
    console.info("Request:", request);
    let result = await service.createInteractiveGame(guestId, accessToken, GameType.Quiz, request);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    // TODO HANDLE MROE!
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opprett spill</Text>
      <TextInput
        placeholder="Spill navn"
        onChangeText={(input) => setRequest(prev => ({ ...prev, name: input }))}
      />
      <TextInput
        placeholder="beskrivelse"
        onChangeText={(input) => setRequest(prev => ({ ...prev, description: input }))}
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
