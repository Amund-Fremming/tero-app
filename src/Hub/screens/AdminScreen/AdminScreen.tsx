import { Text, View } from "react-native";
import styles from "./adminScreenStyles";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";

export const AdminScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>Admin</Text>
      </View>

      <AbsoluteHomeButton />
    </View>
  );
};

export default AdminScreen;
