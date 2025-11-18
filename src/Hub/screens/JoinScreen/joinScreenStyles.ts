import { StyleSheet } from "react-native";
import { Color } from "../../../common/constants/color";
import { verticalScale, moderateScale, horizontalScale } from "@/src/common/utils/dimensions";
import { Font } from "../../../common/constants/Font";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.LightGray,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  header: {
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(25),
    paddingLeft: horizontalScale(20),
    width: "100%",
    color: Color.OffBlack,
    fontSize: moderateScale(40),
    fontWeight: 900,
    fontFamily: Font.PassionOneBold
  },

  goBack: {
    position: "absolute",
    top: verticalScale(50),
    left: verticalScale(20),
    backgroundColor: Color.LightGray,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(40),
    height: horizontalScale(40)
  },

  paragraph: {
    fontSize: moderateScale(16),
  },

  input: {
    paddingLeft: horizontalScale(15),
    fontSize: moderateScale(18),
    color: Color.OffBlack,
    height: 50,
    width: 240,
  },

  card: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(20),
    backgroundColor: Color.White,
    gap: verticalScale(25),
    paddingBottom: verticalScale(40)
  },

  inputWrapper: {
    paddingLeft: horizontalScale(30),
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: moderateScale(4),
    borderRadius: moderateScale(10)
  },

  button: {
    width: horizontalScale(300),
    height: verticalScale(63),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10),
    backgroundColor: Color.Purple,
  },

  buttonText: {
    fontFamily: Font.PassionOneRegular,
    fontSize: moderateScale(28),
    color: Color.White
  },
});

export default styles;
