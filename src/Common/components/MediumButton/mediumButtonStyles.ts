import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";
import { Font } from "../../constants/Font";

export const styles = StyleSheet.create({
  container: {
    width: horizontalScale(140),
    height: verticalScale(45),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: Font.SpaceMonoRegular,
    fontSize: moderateScale(18),
  },
});

export default styles;
