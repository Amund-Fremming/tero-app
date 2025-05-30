import { View, Text, Button } from "react-native";
import styles from "./lobbyScreenStyles";
import AbsoluteHomeButton from "@/app/Hub/components/AbsoluteHomeButton/AbsoluteHomeButton";

export const LobbyScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>LobbyScreen</Text>
      <Button title="Start" />

      <AbsoluteHomeButton />
    </View>
  );
};

export default LobbyScreen;
