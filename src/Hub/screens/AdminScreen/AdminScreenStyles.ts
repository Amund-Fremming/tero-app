import { StyleSheet } from "react-native";
import Colors, { Color } from "../../../common/constants/color";
import { horizontalScale, moderateScale, verticalScale } from "@/src/common/utils/dimensions";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    backgroundColor: Colors.LightGray,
    gap: verticalScale(20)
  },

  leadContainer: {
    paddingTop: verticalScale(50),
    width: "90%",
    justifyContent: "center",
  },

  header: {
    color: Colors.Purple,
    fontSize: moderateScale(40),
    fontFamily: "PassionOne-Bold"
  },

  healthCard: {
    borderRadius: moderateScale(10),
    backgroundColor: Color.White,
    width: "90%",
    paddingLeft: horizontalScale(20),
    paddingRight: horizontalScale(20),
    gap: verticalScale(10),
    paddingVertical: verticalScale(20),
  },

  healthWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  fieldWrapper: {
    gap: verticalScale(5),
  },

  healthText: {
    fontFamily: "MonoSpace-Regular",
    fontSize: moderateScale(18),
    fontWeight: 400
  },

  sectionTitle: {
    fontFamily: "MonoSpace-Regular",
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginBottom: verticalScale(10)
  },

  editButton: {
    backgroundColor: Colors.Purple,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(12),
    alignItems: "center",
    marginTop: verticalScale(10)
  },

  editButtonText: {
    color: Color.White,
    fontSize: moderateScale(16),
    fontFamily: "MonoSpace-Regular",
    fontWeight: "600"
  },

  inputWrapper: {
    gap: verticalScale(5),
    marginBottom: verticalScale(10)
  },

  inputLabel: {
    fontFamily: "MonoSpace-Regular",
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: Color.Black
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
    fontFamily: "MonoSpace-Regular",
    fontSize: moderateScale(14),
    backgroundColor: Color.White
  },

  textArea: {
    minHeight: verticalScale(100),
    textAlignVertical: "top"
  },

  toggleWrapper: {
    flexDirection: "row",
    gap: horizontalScale(10)
  },

  toggleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.Purple,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    alignItems: "center"
  },

  toggleButtonActive: {
    backgroundColor: Colors.Purple
  },

  toggleButtonText: {
    fontFamily: "MonoSpace-Regular",
    fontSize: moderateScale(14),
    color: Colors.Purple
  },

  toggleButtonTextActive: {
    color: Color.White
  },

  buttonWrapper: {
    flexDirection: "row",
    gap: horizontalScale(10),
    marginTop: verticalScale(10)
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.Purple,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(12),
    alignItems: "center"
  },

  cancelButtonText: {
    color: Colors.Purple,
    fontSize: moderateScale(16),
    fontFamily: "MonoSpace-Regular",
    fontWeight: "600"
  },

  saveButton: {
    flex: 1,
    backgroundColor: Colors.Purple,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(12),
    alignItems: "center"
  },

  saveButtonText: {
    color: Color.White,
    fontSize: moderateScale(16),
    fontFamily: "MonoSpace-Regular",
    fontWeight: "600"
  }
});

export default styles;
