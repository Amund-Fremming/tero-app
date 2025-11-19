import { StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import Colors, { Color } from "../../../common/constants/color";
import { Font } from "../../../common/constants/font";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.SoftPurple,
    justifyContent: "space-between",
    alignItems: "center",
  },

  leadContainer: {
    width: "90%",
    height: "55%",
    justifyContent: "center",
  },

  header: {
    fontSize: moderateScale(110),
    color: Colors.Black,
    fontWeight: 900,
    fontFamily: Font.PassionOneBold
  },

  subHeader: {
    fontWeight: 700,
    fontSize: moderateScale(30),
    color: Colors.White,
    fontFamily: Font.PassionOneRegular
  },

  buttonContainer: {
    width: "100%",
    height: "45%",
    flexWrap: "wrap",
    flexDirection: "row",
  },

  buttonBase: {
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  topLeft: {
    backgroundColor: Colors.BuzzifyDarkBg,
  },

  topRight: {
    backgroundColor: "transparent",
  },

  bottomLeft: {
    backgroundColor: Colors.BuzzifyPeach,
  },

  bottomRight: {
    backgroundColor: Colors.BuzzifyOrange,
  },

  textCircle: {
    borderRadius: moderateScale(400),
    width: verticalScale(90),
    height: horizontalScale(90),
    backgroundColor: Color.White,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonTextWrapper: {
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
  },

  textBase: {
    fontSize: moderateScale(18),
    fontWeight: "900",
    textAlign: "center",
  },

  textTopLeft: {
    fontFamily: Font.PassionOneBold,
    fontSize: moderateScale(35),
    color: Colors.White,
  },

  textTopRight: {
    color: Colors.BuzzifyOrange,
    fontFamily: Font.PassionOneBold,
    fontSize: moderateScale(35),
  },

  textBottomLeft: {
    color: Colors.BuzzifyLavender,
    fontFamily: Font.PassionOneBold,
    fontSize: moderateScale(35),
  },

  textBottomRight: {
    fontFamily: Font.PassionOneBold,
    fontSize: moderateScale(35),
    color: Colors.Black,
  },
});

export default styles;
