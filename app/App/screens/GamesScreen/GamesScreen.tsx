import { View, Text, Button } from "react-native";

export const GamesScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>GamesScreen</Text>
      <Button
        title="Go to SpinGame"
        onPress={() => navigation.navigate("SpinGame")}
      ></Button>
    </View>
  );
};

export default GamesScreen;
