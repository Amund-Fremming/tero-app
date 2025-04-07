import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/dimensions";
import Colors from "../../assets/constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.Purple,
    justifyContent: "space-between",
    alignItems: "center",
  },

  leadContainer: {
    width: "90%",
    height: "50%",
    justifyContent: "center",
  },

  header: {
    fontSize: moderateScale(60),
    color: Colors.Black,
    fontWeight: 900,
  },

  subHeader: {
    fontSize: moderateScale(20),
    color: Colors.White,
    fontWeight: 900,
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
    backgroundColor: Colors.Beige,
  },

  bottomRight: {
    backgroundColor: Colors.Red,
  },

  buttonTextWrapper: {
    flexDirection: "column",
  },

  textBase: {
    fontSize: moderateScale(30),
    fontWeight: 900,
  },

  textTopLeft: {
    color: Colors.White,
  },

  textTopRight: {
    color: Colors.Red,
  },

  textBottomLeft: {
    color: Colors.Purple,
  },

  textBottomRight: {
    color: Colors.Black,
  },
});

export default styles;
