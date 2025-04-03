import { StyleSheet } from "react-native";
import Colors from "../../assets/constants/Colors";
import { moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.Black,
  },

  leadContainer: {
    paddingTop: verticalScale(20),
    width: "90%",
    justifyContent: "center",
  },

  header: {
    color: Colors.Red,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },
});

export default styles;
