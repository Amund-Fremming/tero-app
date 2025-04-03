import { View, Text } from "react-native";
import styles from "./createScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../assets/constants/Screen";
import Colors from "../../assets/constants/Colors";

export const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>Lag spill</Text>
      </View>

      <AbsoluteNavButton
        label="Hjem"
        destination={Screen.Home}
        primary={Colors.Red}
        secondary={Colors.Black}
      />
    </View>
  );
};

export default CreateScreen;
