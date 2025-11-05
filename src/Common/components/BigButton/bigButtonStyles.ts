import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    width: horizontalScale(300),
    height: verticalScale(63),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10)
  },

  text: {
    fontFamily: "PassionOne-Regular",
    fontSize: moderateScale(28),
  },
});

export default styles;
