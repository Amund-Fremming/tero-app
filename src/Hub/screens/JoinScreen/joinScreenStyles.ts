import { StyleSheet } from "react-native";
import { Color } from "../../../common/constants/color";
import { verticalScale, moderateScale, horizontalScale } from "@/src/common/utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Beige,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  header: {
    paddingTop: verticalScale(20),
    paddingLeft: horizontalScale(20),
    width: "100%",
    color: Color.Black,
    fontSize: moderateScale(40),
    fontWeight: 900,
    fontFamily: "PassionOne-Bold"
  },

  goBack: {
    backgroundColor: Color.LightGray,
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(40)
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
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: moderateScale(4),
    borderRadius: moderateScale(10)
  }
});

export default styles;
