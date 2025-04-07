import { View, Text, Button } from "react-native";
import Screen from "../../assets/constants/Screen";

export const GamesScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>GamesScreen</Text>
      <Button
        title="Go to SpinGame"
        onPress={() => navigation.navigate("SpinGame")}
      ></Button>
      <Button
        title="Go to AskGame"
        onPress={() => navigation.navigate(Screen.AskGame)}
      ></Button>
    </View>
  );
};

export default GamesScreen;
