import { StyleSheet } from "react-native";
import Colors, { Color } from "../../../common/constants/color";
import { horizontalScale, moderateScale, verticalScale } from "@/src/common/utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.LightGray,
    gap: verticalScale(20)
  },

  leadContainer: {
    paddingTop: verticalScale(20),
    width: "90%",
    justifyContent: "center",
  },

  header: {
    color: Colors.Purple,
    fontSize: moderateScale(40),
    fontFamily: "PassionOne-Bold"
  },

  healthCard: {
    borderRadius: moderateScale(10),
    backgroundColor: Color.White,
    width: "90%",
    paddingLeft: horizontalScale(20),
    paddingRight: horizontalScale(20),
    gap: verticalScale(10),
    paddingVertical: verticalScale(20),
  },

  healthWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  healthText: {
    fontFamily: "MonoSpace-Regular",
    fontSize: moderateScale(18),
    fontWeight: 400
  }
});

export default styles;
