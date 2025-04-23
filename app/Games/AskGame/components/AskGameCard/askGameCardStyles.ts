import { moderateScale, verticalScale } from "@/app/Hub/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "95%",
    height: verticalScale(100),
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 2,
    borderColor: "gray",
  },

  header: {
    fontSize: moderateScale(20),
    fontWeight: 600,
  },

  paragraph: {
    fontSize: moderateScale(16),
  },

  iterations: {
    fontSize: moderateScale(18),
    fontWeight: 500,
  },
});

export default styles;
