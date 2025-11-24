import { Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import styles from "./createScreenStyles";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { PLATFORM_URL_BASE } from "@/src/common/constants/endpoints";
import { GameService } from "@/src/common/services/gameService";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { CreateGameRequest, GameType, GameCategory } from "@/src/common/constants/types";
import SpinGame from "../../SpinGame";
import { useState } from "react";
import { CreateAskGameRequest } from "@/src/quizGame/constants/spinTypes";
import Color from "@/src/common/constants/color";
import { Feather } from "@expo/vector-icons";

const service = new GameService(PLATFORM_URL_BASE);

const CATEGORY_OPTIONS = [
  { label: "Standard", value: GameCategory.Default },
  { label: "Tilfeldig", value: GameCategory.Random },
  { label: "Casual", value: GameCategory.Casual },
  { label: "Damer", value: GameCategory.Ladies },
  { label: "Gutter", value: GameCategory.Boys },
];

export const CreateScreen = ({ navigation }: any) => {
  const { setUniversalGameValues } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();
  const { pseudoId: guestId, accessToken } = useAuthProvider();

  const [request, setRequest] = useState<CreateGameRequest>({ 
    name: "", 
    category: GameCategory.Default 
  });

  const handleCreate = async () => {
    console.info("Request:", request);
    let result = await service.createInteractiveGame(guestId, accessToken, GameType.Spin, request);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    // TODO HANDLE MROE!
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Opprett spill</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Spillnavn</Text>
          <TextInput
            style={styles.input}
            placeholder="Skriv spillnavn her"
            placeholderTextColor={Color.Gray}
            value={request.name}
            onChangeText={(input) => setRequest(prev => ({ ...prev, name: input }))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Beskrivelse</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Skriv en beskrivelse"
            placeholderTextColor={Color.Gray}
            value={request.description}
            multiline
            numberOfLines={3}
            onChangeText={(input) => setRequest(prev => ({ ...prev, description: input }))}
          />
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.label}>Velg kategori</Text>
          <View style={styles.categoryGrid}>
            {CATEGORY_OPTIONS.map((category) => (
              <TouchableOpacity
                key={category.value}
                style={[
                  styles.categoryButton,
                  request.category === category.value && styles.categoryButtonSelected
                ]}
                onPress={() => setRequest(prev => ({ ...prev, category: category.value }))}
              >
                <Text style={[
                  styles.categoryButtonText,
                  request.category === category.value && styles.categoryButtonTextSelected
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Feather name="plus-circle" size={24} color={Color.White} />
          <Text style={styles.createButtonText}>Opprett spill</Text>
        </TouchableOpacity>

        <AbsoluteHomeButton />
      </View>
    </ScrollView>
  );
};

export default CreateScreen;
