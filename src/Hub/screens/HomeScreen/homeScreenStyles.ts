import { StyleSheet } from "react-native";
import { moderateScale } from "@/src/common/utils/dimensions";
import Colors, { Color } from "../../../common/constants/color";
import { Font } from "../../../common/constants/Font";

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
  },

  buttonBase: {
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  topLeft: {
    backgroundColor: Colors.HomeBlack,
  },

  topRight: {
    backgroundColor: Colors.White,
  },

  bottomLeft: {
    backgroundColor: Colors.HomeBeige,
  },

  bottomRight: {
    backgroundColor: Colors.HomeRed,
  },

  buttonTextWrapper: {
    flexDirection: "column",
  },

  textBase: {
    fontSize: moderateScale(18),
    fontWeight: 900,
  },

  textTopLeft: {
    fontFamily: Font.PassionOneRegular,
    fontSize: moderateScale(30),
    color: Colors.White,
  },

  textTopRight: {
    color: Colors.HomeRed,
    fontFamily: Font.PassionOneRegular,
    fontSize: moderateScale(30),
  },

  textBottomLeft: {
    color: Color.Purple,
    fontFamily: Font.PassionOneRegular,
    fontSize: moderateScale(30),
  },

  textBottomRight: {
    fontFamily: Font.PassionOneRegular,
    fontSize: moderateScale(30),
    color: Colors.HomeBlack,
  },
});

export default styles;
