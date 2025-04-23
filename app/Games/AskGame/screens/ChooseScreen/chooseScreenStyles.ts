import { moderateScale, verticalScale } from "@/app/Hub/utils/dimensions";
import { version } from "react";
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
    paddingTop: verticalScale(20),
    fontSize: moderateScale(20),
    fontWeight: 600,
  },

  paragraph: {
    fontSize: moderateScale(16),
  },
});

export default styles;
