import { StyleSheet } from "react-native";
import Colors, { Color } from "../../../common/constants/color";
import { horizontalScale, moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import { Font } from "../../../common/constants/Font";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.LightGray,
    gap: verticalScale(20)
  },

  leadContainer: {
    paddingTop: verticalScale(50),
    width: "90%",
    justifyContent: "center",
  },

  header: {
    color: Colors.Purple,
    fontSize: moderateScale(40),
    fontFamily: Font.PassionOneBold
  },

  activeButton: {
    position: "absolute",
    top: verticalScale(20),
    right: horizontalScale(20)
  },

  modalIndicator: {
    fontSize: moderateScale(15),
    position: "absolute",
    top: verticalScale(0),
    right: horizontalScale(0)
  },

  popupText: {
    fontFamily: Font.SintonyBold,
    fontSize: moderateScale(19),
    color: Color.Purple
  },

  popupButton: {
    marginTop: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: moderateScale(10),
    height: verticalScale(45),
    borderWidth: moderateScale(3),
    borderColor: Color.Purple
  },

  healthCard: {
    borderRadius: moderateScale(10),
    backgroundColor: Color.White,
    width: "90%",
    paddingLeft: horizontalScale(20),
    paddingRight: horizontalScale(20),
    gap: verticalScale(10),
    paddingVertical: verticalScale(20),
  },

  healthWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  healthText: {
    fontFamily: Font.SintonyRegular,
    fontSize: moderateScale(17),
    fontWeight: 400
  }
});

export default styles;
