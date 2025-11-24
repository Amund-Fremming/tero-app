import { horizontalScale, moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";
import Color from "@/src/common/constants/color";
import Font from "@/src/common/constants/font";

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    width: "100%",
    minHeight: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Color.LightGray,
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(100),
    gap: verticalScale(20),
  },

  header: {
    fontSize: moderateScale(45),
    fontFamily: Font.PassionOneBold,
    color: Color.Purple,
    marginBottom: verticalScale(10),
  },

  inputContainer: {
    width: "90%",
    gap: verticalScale(8),
  },

  label: {
    fontSize: moderateScale(18),
    fontFamily: Font.PassionOneRegular,
    color: Color.Black,
  },

  input: {
    backgroundColor: Color.White,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    fontSize: moderateScale(16),
    fontFamily: Font.SintonyRegular,
    color: Color.Black,
    borderWidth: 1,
    borderColor: Color.Gray,
  },

  textArea: {
    height: verticalScale(80),
    textAlignVertical: "top",
  },

  categoryContainer: {
    width: "90%",
    gap: verticalScale(10),
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: moderateScale(10),
    justifyContent: "flex-start",
  },

  categoryButton: {
    backgroundColor: Color.White,
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    borderWidth: 2,
    borderColor: Color.Gray,
    minWidth: horizontalScale(100),
    alignItems: "center",
  },

  categoryButtonSelected: {
    backgroundColor: Color.Purple,
    borderColor: Color.Purple,
  },

  categoryButtonText: {
    fontSize: moderateScale(16),
    fontFamily: Font.SintonyRegular,
    color: Color.Black,
  },

  categoryButtonTextSelected: {
    color: Color.White,
    fontFamily: Font.SintonyBold,
  },

  createButton: {
    backgroundColor: Color.Purple,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(40),
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    marginTop: verticalScale(10),
    elevation: 3,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  createButtonText: {
    fontSize: moderateScale(22),
    fontFamily: Font.PassionOneRegular,
    color: Color.White,
  },
});

export default styles;
