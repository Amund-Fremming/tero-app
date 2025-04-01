import { View, Text, Pressable } from "react-native";
import Screen from "../../assets/constants/Screen";
import styles from "./homeScreenStyles";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>buzzify</Text>
        <Text style={styles.subHeader}>Lets get cronked</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.topLeft }}
          onPress={() => navigation.navigate(Screen.Games)}
        >
          <Text style={styles.buttonText}>Lag spill</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.topRight }}
          onPress={() => navigation.navigate(Screen.Games)}
        >
          <Text style={styles.buttonText}>Velg spill</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.bottomLeft }}
          onPress={() => navigation.navigate(Screen.Hub)}
        >
          <Text style={styles.buttonText}>Til hub</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.bottomRight }}
          onPress={() => navigation.navigate(Screen.Join)}
        >
          <Text style={styles.buttonText}>Bli med</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
