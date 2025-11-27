import { StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";
import { Font } from "../../constants/Font";

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5);",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(350),
    height: verticalScale(240),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(15),
    gap: verticalScale(15),
    backgroundColor: Color.White,
    borderColor: Color.Purple,
    paddingHorizontal: horizontalScale(20),
  },
  header: {
    fontFamily: Font.PassionOneBold,
    fontSize: moderateScale(34),
    color: Color.Black,
  },
  message: {
    fontFamily: Font.SpaceMonoRegular,
    fontSize: moderateScale(16),
    textAlign: "center",
    color: Color.Black,
  },
  buttonsWrapper: {
    flexDirection: "row",
    gap: horizontalScale(15),
    marginTop: verticalScale(5),
  },
  button: {
    backgroundColor: Color.Purple,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(30),
    borderRadius: moderateScale(8),
  },
  buttonText: {
    fontFamily: Font.SpaceMonoRegular,
    fontSize: moderateScale(16),
    color: Color.White,
    fontWeight: "600",
  },
});

export default styles;
