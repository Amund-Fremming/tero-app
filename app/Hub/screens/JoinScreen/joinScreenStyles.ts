import { StyleSheet } from "react-native";
import Colors from "../../constants/Color";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.Red,
  },

  header: {
    paddingTop: verticalScale(20),
    paddingLeft: horizontalScale(20),
    width: "100%",
    color: Colors.Black,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },
});

export default styles;
