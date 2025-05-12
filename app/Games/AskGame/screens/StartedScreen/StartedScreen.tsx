import { View, Text } from "react-native";
import styles from "./startedScreenStyles";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "@/app/Hub/constants/Screen";

export const StartedScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.header}>Du kan legge vekk telefonen, spillet har startet.</Text>
      </View>

      <AbsoluteNavButton label="Hjem" destination={Screen.Home} primary="black" secondary="white" />
    </View>
  );
};

export default StartedScreen;
