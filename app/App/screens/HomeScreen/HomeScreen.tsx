import { View, Text, Button } from "react-native";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Go to SpinGame"
        onPress={() => navigation.navigate("SpinGame")}
      />
      <Button
        title="Go to AskGame"
        onPress={() => navigation.navigate("AskGame")}
      />
    </View>
  );
};

export default HomeScreen;
