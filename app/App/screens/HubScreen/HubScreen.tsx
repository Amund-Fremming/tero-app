import { View, Text, Button } from "react-native";

export const HubScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Go to SpinGame"
        onPress={() => navigation.navigate("SpinGame")}
      ></Button>
    </View>
  );
};

export default HubScreen;
