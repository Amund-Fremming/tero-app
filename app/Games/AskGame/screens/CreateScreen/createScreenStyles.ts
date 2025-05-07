import { moderateScale } from "@/app/Hub/utils/dimensions";
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
    fontSize: moderateScale(16),
  },
});

export default styles;
