import { StyleSheet } from "react-native";
import Colors, { Color } from "../../constants/Color";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Black,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingTop: verticalScale(20),
    paddingLeft: horizontalScale(20),
    width: "100%",
    color: Colors.White,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },
});

export default styles;
