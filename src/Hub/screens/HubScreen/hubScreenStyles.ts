import { StyleSheet } from "react-native";
import Colors from "../../../common/constants/color";
import { verticalScale, moderateScale, horizontalScale } from "@/src/common/utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.Beige,
  },

  header: {
    color: Colors.Purple,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },

  topWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(20),
    width: "90%",
    display: "flex",
    flexDirection: "row"
  }
});

export default styles;
