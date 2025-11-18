import { Button, Pressable, Text, View } from "react-native";
import { styles } from "./infoModalStyles";

interface IInfoModal {
  header: string;
  message: string;
  isError: boolean;
  onCloseFunc: () => void;
}

export const InfoModal = ({ isError, header, message, onCloseFunc }: IInfoModal) => {
  return (
    <View style={styles.overlay}>
      <View style={[styles.genericContainer, isError ? styles.errorContainer : styles.messageContainer]}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onCloseFunc} style={styles.button}>
          <Text style={styles.buttonText}>Lukk</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InfoModal;
