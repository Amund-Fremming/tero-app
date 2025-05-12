import { View, Text, Button } from "react-native";
import styles from "./hubScreenStyles";
import { AbsoluteNavButton } from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../constants/Screen";
import Colors from "../../constants/Color";

export const HubScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hub</Text>

      <Button title="Admin dashboard" onPress={() => navigation.navigate(Screen.Admin)} />

      <AbsoluteNavButton label="Back" destination={Screen.Home} primary={Colors.Purple} secondary={Colors.Beige} />
    </View>
  );
};

export default HubScreen;
