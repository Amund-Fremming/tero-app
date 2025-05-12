import { Text, View } from "react-native";
import styles from "./AdminScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../constants/Screen";
import Colors from "../../constants/Color";

export const AdminScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>Admin</Text>
      </View>

      <AbsoluteNavButton label="Hjem" destination={Screen.Home} primary={Colors.Black} secondary={Colors.White} />
    </View>
  );
};

export default AdminScreen;
