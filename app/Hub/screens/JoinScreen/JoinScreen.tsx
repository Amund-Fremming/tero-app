import { View, Text, Button } from "react-native";
import styles from "./joinScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../constants/Screen";
import Colors from "../../constants/Color";

export const JoinScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>Bli med</Text>
      </View>

      <AbsoluteNavButton
        label="Hjem"
        destination={Screen.Home}
        primary={Colors.Black}
        secondary={Colors.Red}
      />
    </View>
  );
};

export default JoinScreen;
