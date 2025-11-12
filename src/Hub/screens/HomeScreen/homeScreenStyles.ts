import { StyleSheet } from "react-native";
import { moderateScale } from "@/src/common/utils/dimensions";
import Colors from "../../../common/constants/color";
import { Font } from "../../../common/constants/Font";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.LightGray,
    justifyContent: "space-between",
    alignItems: "center",
  },

  leadContainer: {
    width: "90%",
    height: "50%",
    justifyContent: "center",
  },

  header: {
    fontSize: moderateScale(80),
    color: Colors.Black,
    fontWeight: 900,
    fontFamily: Font.PassionOneBold
  },

  subHeader: {
    fontWeight: 700,
    fontSize: moderateScale(20),
    color: Colors.Gray,
    fontFamily: Font.PassionOneRegular
  },

  buttonContainer: {
    width: "100%",
    height: "50%",
    flexWrap: "wrap",
  },

  buttonBase: {
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  topLeft: {
    backgroundColor: Colors.Black,
  },

  topRight: {
    backgroundColor: Colors.White,
  },

  bottomLeft: {
    backgroundColor: Colors.White,
  },

  bottomRight: {
    backgroundColor: Colors.Black,
  },

  buttonTextWrapper: {
    flexDirection: "column",
  },

  textBase: {
    fontSize: moderateScale(18),
    fontWeight: 900,
  },

  textTopLeft: {
    color: Colors.White,
  },

  textTopRight: {
    color: Colors.Black,
  },

  textBottomLeft: {
    color: Colors.Black,
  },

  textBottomRight: {
    color: Colors.White,
  },
});

export default styles;
