import Color from "@/app/Hub/constants/Color";
import { moderateScale, verticalScale } from "@/app/Hub/utils/dimensions";
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
});

export default styles;
