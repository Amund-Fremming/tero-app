import Color from "@/src/common/constants/color";
import { horizontalScale, moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.White,
  },

  header: {
    color: Color.Black,
    paddingTop: verticalScale(20),
    fontSize: moderateScale(35),
    fontWeight: 600,
  },

  paragraph: {
    color: Color.Black,
    fontSize: moderateScale(16),
  },

  navButtons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    gap: horizontalScale(15),
  },

  buttonLabel: {
    color: Color.White,
    fontSize: moderateScale(16),
  },

  button: {
    backgroundColor: Color.Black,
    width: horizontalScale(100),
    height: verticalScale(35),
    justifyContent: "center",
    alignItems: "center",
  },

  cardHeader: {
    fontSize: moderateScale(20),
    color: Color.Black
  },

  cardDescription: {
    fontSize: moderateScale(14),
    color: Color.Gray
  },

  cardCategory: {
    color: Color.Green
  },
});

export default styles;
