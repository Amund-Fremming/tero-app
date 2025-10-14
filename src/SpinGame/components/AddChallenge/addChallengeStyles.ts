import Color from "@/src/common/constants/color";
import { moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},

  participantsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: moderateScale(60),
  },

  participantsButton: {
    borderColor: Color.Black,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(8),
  },

  selectedWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: verticalScale(40),
  },
});

export default styles;
