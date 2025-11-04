import Color from "@/src/common/constants/color";
import { horizontalScale, moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "100%",
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
        width: "100%",
        justifyContent: "center",
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
        fontSize: moderateScale(25

        ),
        fontWeight: 600,
    },

    username: {
        paddingTop: verticalScale(5),
        fontSize: moderateScale(18)
    }
})