import Color from "@/src/common/constants/color";
import { horizontalScale, verticalScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    color: Color.Red,
    borderWidth: 2,
    borderColor: Color.Black,
    borderRadius: 8,
    width: horizontalScale(40),
    height: verticalScale(40),
  },
});
