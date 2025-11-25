import { Pressable, Text, TextInput, View } from "react-native";
import styles from "./createScreenStyles";
import { useModalProvider } from "@/src/Common/context/ModalProvider";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import AbsoluteHomeButton from "@/src/Common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { PLATFORM_URL_BASE } from "@/src/Common/constants/Endpoints";
import { GameService } from "@/src/Common/services/gameService";
import { useAuthProvider } from "@/src/Common/context/AuthProvider";
import { CreateGameRequest, GameType } from "@/src/Common/constants/Types";
import SpinGame from "../../SpinGame";
import { useState } from "react";
import { CreateAskGameRequest } from "@/src/quizGame/constants/spinTypes";

const service = new GameService(PLATFORM_URL_BASE);

export const CreateScreen = ({ navigation }: any) => {
  const { setUniversalGameValues } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();
  const { pseudoId: guestId, accessToken } = useAuthProvider();

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
