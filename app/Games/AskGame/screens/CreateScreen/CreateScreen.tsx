import { View, Text } from "react-native";
import styles from "./createScreenStyles";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Color from "@/app/Hub/constants/Color";
import Screen from "@/app/Hub/constants/Screen";

export const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create game</Text>
      <Text style={styles.paragraph}>lorem</Text>

      <AbsoluteNavButton
        primary={Color.Beige}
        secondary={Color.White}
        destination={Screen.Home}
        label="Home"
      />
    </View>
  );
};
