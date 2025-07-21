import { Text, View } from "react-native";
import styles from "./AdminScreenStyles";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import Screen from "../../../Common/constants/Screen";
import Colors from "../../../Common/constants/Color";

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
