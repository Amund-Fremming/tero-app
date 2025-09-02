import { StyleSheet } from "react-native";
import Colors from "../../../common/constants/color";
import { horizontalScale, moderateScale, verticalScale } from "../../../common/utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.Beige,
  },

  header: {
    paddingTop: verticalScale(20),
    paddingLeft: horizontalScale(20),
    width: "100%",
    color: Colors.Purple,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },
});

export default styles;
