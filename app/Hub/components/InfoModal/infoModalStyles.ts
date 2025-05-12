import { StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5);",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  genericContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(350),
    height: verticalScale(220),
    borderWidth: moderateScale(2.5),
    gap: verticalScale(20),
  },
  messageContainer: {
    backgroundColor: Color.White,
    borderColor: Color.Green,
  },
  errorContainer: {
    backgroundColor: Color.White,
    borderColor: Color.Red,
  },
  header: {
    fontFamily: "SpaceMono",
    fontSize: moderateScale(30),
  },
  message: {
    fontFamily: "SpaceMono",
    fontSize: moderateScale(18),
  },
  button: {
    borderBottomWidth: moderateScale(2),
  },
  buttonText: {
    fontFamily: "SpaceMono",
    fontSize: moderateScale(14),
  },
});

export default styles;
