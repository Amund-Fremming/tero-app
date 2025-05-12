import Color from "@/app/Hub/constants/Color";
import { moderateScale } from "@/app/Hub/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  header: {
    fontWeight: 800,
    fontSize: moderateScale(20),
    color: Color.Black,
    textAlign: "center",
  },

  textBox: {
    width: "70%",
  },
});

export default styles;
