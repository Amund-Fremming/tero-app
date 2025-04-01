import { View, Text, Button } from "react-native";

export const JoinScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>JoinScreen</Text>
      <Button
        title="Go to SpinGame"
        onPress={() => navigation.navigate("SpinGame")}
      ></Button>
    </View>
  );
};

export default JoinScreen;
