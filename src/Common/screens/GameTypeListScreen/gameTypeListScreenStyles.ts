import { StyleSheet } from "react-native";
import Colors, { Color } from "../../constants/color";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Black,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingTop: verticalScale(20),
    paddingLeft: horizontalScale(20),
    width: "100%",
    color: Colors.White,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },

  card: {
    borderWidth: 2,
    borderColor: Color.White,
    padding: 10,
    gap: 8,
    height: 150,
    width: "95%",
  },

  cardHeader: {
    fontWeight: 600,
    fontSize: 20,
    color: Color.White,
  },

  paragraph: {
    color: Color.White,
  },
});

export default styles;
