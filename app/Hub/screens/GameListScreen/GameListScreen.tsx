import { View, Text, Button } from "react-native";
import Screen from "../../constants/Screen";

export const GameListScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>GameListScreen</Text>
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

export default GameListScreen;
