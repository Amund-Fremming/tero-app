import { Pressable, Text, TextInput, View } from "react-native";
import styles from "./createScreenStyles";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";

export const CreateScreen = ({ navigation }: any) => {
  const { setUniversalGameValues } = useGlobalGameProvider();
  const { displayErrorModal } = useModalProvider();

  const handleCreate = async () => {
    //
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opprett spill</Text>
      <TextInput
        placeholder="Spill navn"
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
