import { moderateScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  header: {
    fontSize: moderateScale(20),
    fontWeight: 600,
  },

  paragraph: {
    fontSize: moderateScale(16),
  },

  input: {
    borderWidth: 2,
    borderColor: "gray",
    height: 50,
    width: 240,
  },
});

export default styles;
