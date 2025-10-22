import { StyleSheet } from "react-native";
import Colors, { Color } from "../../constants/color";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row"
  },

  header: {
    paddingTop: verticalScale(20),
    paddingLeft: horizontalScale(20),
    width: "100%",
    color: Colors.Black,
    fontSize: moderateScale(40),
    fontWeight: 900,
  },

  card: {
    borderWidth: 6,
    borderColor: Color.Black,
    height: 230,
    width: "45%",
  },

  cardHeader: {
    fontWeight: 600,
    fontSize: 20,
    color: Color.Black,
  },

  paragraph: {
    color: Color.Black,
  },
});

export default styles;
