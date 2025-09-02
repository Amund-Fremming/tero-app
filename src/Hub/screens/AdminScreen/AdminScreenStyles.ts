import { StyleSheet } from "react-native";
import Colors from "../../../common/constants/Color";
import { moderateScale, verticalScale } from "../../../common/utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.White,
  },

  leadContainer: {
    paddingTop: verticalScale(20),
    width: "90%",
    justifyContent: "center",
  },

  header: {
    color: Colors.Black,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },
});

export default styles;
