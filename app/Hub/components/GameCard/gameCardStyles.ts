import { StyleSheet } from "react-native";
import Color from "../../constants/Color";

export const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: Color.White,
    padding: 10,
    gap: 8,
    height: 150,
    width: "95%",
  },

  header: {
    fontWeight: 600,
    fontSize: 20,
    color: Color.White,
  },

  paragraph: {
    color: Color.White,
  },
});

export default styles;
