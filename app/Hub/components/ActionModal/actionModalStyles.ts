import { StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/dimensions";

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
    height: verticalScale(220),
    borderWidth: moderateScale(2.5),
    gap: verticalScale(20),
    backgroundColor: Color.White,
    borderColor: Color.Gray,
  },
  header: {
    fontFamily: "SpaceMono",
    fontSize: moderateScale(30),
  },
  message: {
    fontFamily: "SpaceMono",
    fontSize: moderateScale(18),
  },
  buttonsWrapper: {
    flexDirection: "row",
    gap: horizontalScale(25),
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
