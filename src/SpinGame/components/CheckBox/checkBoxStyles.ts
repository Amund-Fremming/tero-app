import Color from "@/src/Common/constants/Color";
import { horizontalScale, verticalScale } from "@/src/Common/utils/dimensions";
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
