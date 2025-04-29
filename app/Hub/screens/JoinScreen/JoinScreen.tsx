import { View, Text, Button } from "react-native";
import styles from "./joinScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../constants/Screen";
import Colors from "../../constants/Color";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { useInfoModalProvider } from "../../context/InfoModalProvider";

export const JoinScreen = () => {
  const [userInput, setUserInput] = useState<string>("");

  const { displayErrorModal } = useInfoModalProvider();

  const handleJoinGame = () => {
    var result = Number.parseInt(userInput);
    if (isNaN(result)) {
      displayErrorModal("Spill id må være ett tall");
      return;
    }

    // TODO: koble på hub, forsøk å bli med i spill, feiler det, dosconnect ot vis melding, ellers naviger videre
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bli med</Text>

      <TextInput
        placeholder="Skriv inn id"
        value={userInput}
        onChangeText={(input) => setUserInput(input)}
      />

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
