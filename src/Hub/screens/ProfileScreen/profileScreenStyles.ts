import Color from "@/src/common/constants/color";
import { horizontalScale, moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: Color.White
    },

    debugHeader: {
        fontSize: moderateScale(25),
        fontWeight: 700,
        paddingRight: "60%",
        paddingBottom: verticalScale(15)
    },

    debugBox: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: verticalScale(25),
        borderColor: Color.Red,
        borderWidth: moderateScale(6),
        width: "90%"
    },

    loginButton: {
        width: "80%",
        height: verticalScale(50),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray"
    },

    loginButtonText: {
        fontSize: moderateScale(26),
        color: "black"
    },

    loggedIn: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
    },

    image: {
        width: horizontalScale(100),
        height: verticalScale(100),
    },

    imageCard: {
        marginTop: verticalScale(30),
        justifyContent: "flex-end",
        alignItems: "center",
        width: horizontalScale(120),
        height: verticalScale(120),
        borderRadius: moderateScale(28),
        backgroundColor: Color.Blue
    },

    name: {
        paddingTop: verticalScale(15),
        fontSize: moderateScale(25),
        fontWeight: 600,
    },

    username: {
        paddingTop: verticalScale(5),
        fontSize: moderateScale(18)
    },

    editText: {
        fontSize: moderateScale(25),
        color: Color.Purple,
    },

    editButton: {
        marginTop: verticalScale(15),
        height: verticalScale(40),
        width: horizontalScale(205),
        borderRadius: moderateScale(10),
        borderColor: Color.Purple,
        borderWidth: moderateScale(2.5),
        justifyContent: "center",
        alignItems: "center"
    },

    layover: {
        width: "100%",
        height: "55%",
        backgroundColor: Color.LightGray,
        borderTopLeftRadius: moderateScale(50),
        borderTopRightRadius: moderateScale(50),
        marginTop: verticalScale(20),
        justifyContent: "flex-start",
        alignItems: "center",
    },

    iconsBar: {
        position: "absolute",
        top: verticalScale(15),
        width: "95%",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row"
    },

    bigButton: {
        marginTop: verticalScale(30),
        width: "86%",
        height: verticalScale(60),
        borderRadius: moderateScale(15),
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row"
    },

    iconGuard: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: moderateScale(10),
        backgroundColor: Color.White,
        width: horizontalScale(55),
        height: verticalScale(55),
    },

    buttonText: {
        paddingRight: horizontalScale(110),
        fontSize: moderateScale(18)
    }
})