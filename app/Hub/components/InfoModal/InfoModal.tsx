import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./infoModalStyles";

interface IInfoModal {
  message: string;
  isError: boolean;
  modalVisible: boolean;
  setModalVisible: (condition: boolean) => void;
  onCloseFunc?: () => void;
}

export const InfoModal = ({
  modalVisible,
  setModalVisible,
  isError,
  message,
  onCloseFunc: onClose = () => {},
}: IInfoModal) => {
  const handleCloseModal = () => {
    onClose();
    setModalVisible(!modalVisible);
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.genericContainer,
            isError ? styles.errorContainer : styles.messageContainer,
          ]}
        >
          <Text style={styles.header}>{isError ? "Ooops" : "Hey"}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable onPress={handleCloseModal} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
