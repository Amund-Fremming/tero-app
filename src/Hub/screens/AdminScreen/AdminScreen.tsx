import { Text, View } from "react-native";
import styles from "./adminScreenStyles";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useAuthProvider } from "@/src/common/context/AuthProvider";

export const AdminScreen = () => {
  const { redirectUri } = useAuthProvider();

  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>Admin</Text>
      </View>

      <Text>Redirect uri: {redirectUri}</Text>

      <AbsoluteHomeButton />
    </View>
  );
};

export default AdminScreen;
