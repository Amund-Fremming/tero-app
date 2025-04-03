import { View, Text, Button } from "react-native";
import styles from "./hubScreenStyles";
import { AbsoluteNavButton } from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../assets/constants/Screen";
import Colors from "../../assets/constants/Colors";

export const HubScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>Hub</Text>
      </View>

      <Button
        title="Admin dashboard"
        onPress={() => navigation.navigate(Screen.Admin)}
      />

      <AbsoluteNavButton
        label="Back"
        destination={Screen.Home}
        primary={Colors.Purple}
        secondary={Colors.Beige}
      />
    </View>
  );
};

export default HubScreen;
