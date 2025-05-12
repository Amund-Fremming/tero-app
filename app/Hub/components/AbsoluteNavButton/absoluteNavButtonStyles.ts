import { StyleSheet } from "react-native";
import Colors from "../../constants/Color";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(50),
    width: horizontalScale(150),
    backgroundColor: Colors.Purple,
    position: "absolute",
    bottom: verticalScale(35),
  },

  label: {
    color: Colors.Beige,
    fontSize: moderateScale(20),
    fontWeight: 900,
  },
});

export default styles;
