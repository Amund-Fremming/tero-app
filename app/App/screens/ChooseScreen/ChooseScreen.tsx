import { View, Text } from "react-native";
import styles from "./chooseScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../assets/constants/Screen";
import Colors from "../../assets/constants/Colors";

export const ChooseScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>Velg spill</Text>
      </View>

      <AbsoluteNavButton
        label="Hjem"
        destination={Screen.Home}
        primary={Colors.White}
        secondary={Colors.Purple}
      />
    </View>
  );
};

export default ChooseScreen;
