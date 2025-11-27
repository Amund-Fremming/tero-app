import { StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/dimensions";

export const styles = StyleSheet.create({
    container: {
        paddingLeft: horizontalScale(20),
        height: "100%",
        width: "100%",
        gap: verticalScale(15)
    },


    iconWrapper: {
        backgroundColor: Color.White,
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
        height: verticalScale(40),
        width: horizontalScale(40)
    },

    header: {
        fontSize: moderateScale(28),
        fontWeight: 600,
        color: Color.Black
    },



    subHeader: {
        fontSize: moderateScale(20),
        color: Color.Black
    },

    inputWrapper: {
        gap: verticalScale(4)
    },

    input: {
        paddingLeft: verticalScale(4),
        height: verticalScale(36),
        fontSize: moderateScale(17),
        borderWidth: moderateScale(2.5),
        borderRadius: moderateScale(5),
        borderColor: Color.Gray,
        width: "90%",
    },

    label: {
        fontSize: moderateScale(16)
    },

    multiline: {
        fontSize: moderateScale(17),
        borderRadius: moderateScale(5),
        height: verticalScale(300),
        width: "90%",
        borderWidth: moderateScale(2.5),
        borderColor: Color.Gray,
    },

    button: {
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: verticalScale(50),
        borderRadius: moderateScale(10),
        backgroundColor: Color.Purple
    },

    buttonText: {
        fontSize: moderateScale(22),
        color: Color.White,
        fontWeight: 700
    }
});