import Color from "@/app/Hub/constants/Color";
import { horizontalScale, moderateScale, verticalScale } from "@/app/Hub/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.Black,
  },

  header: {
    color: "white",
    paddingTop: verticalScale(20),
    fontSize: moderateScale(35),
    fontWeight: 600,
  },

  paragraph: {
    color: "white",
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
    color: Color.Black,
    fontSize: moderateScale(16),
  },

  button: {
    backgroundColor: Color.White,
    width: horizontalScale(100),
    height: verticalScale(35),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
