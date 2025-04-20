import { View, Text, Pressable } from "react-native";
import Screen from "../../constants/Screen";
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
          onPress={() => navigation.navigate(Screen.Create)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textTopLeft }}>
              Lag
            </Text>
            <Text style={{ ...styles.textBase, ...styles.textTopLeft }}>
              spill
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.bottomLeft }}
          onPress={() => navigation.navigate(Screen.Hub)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textBottomLeft }}>
              Til
            </Text>
            <Text style={{ ...styles.textBase, ...styles.textBottomLeft }}>
              hub
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.topRight }}
          onPress={() => navigation.navigate(Screen.Choose)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textTopRight }}>
              Velg
            </Text>
            <Text style={{ ...styles.textBase, ...styles.textTopRight }}>
              spill
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.bottomRight }}
          onPress={() => navigation.navigate(Screen.Join)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textBottomRight }}>
              Bli
            </Text>
            <Text style={{ ...styles.textBase, ...styles.textBottomRight }}>
              med
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
