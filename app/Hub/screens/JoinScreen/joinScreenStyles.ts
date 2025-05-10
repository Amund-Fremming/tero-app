import { StyleSheet } from "react-native";
import Colors from "../../constants/Color";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Red,
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
    color: Colors.Black,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },

  paragraph: {
    fontSize: moderateScale(16),
  },

  input: {
    borderWidth: 2,
    borderColor: "black",
    height: 50,
    width: 240,
  },
});

export default styles;
