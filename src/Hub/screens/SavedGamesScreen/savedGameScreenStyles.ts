import Color from "@/src/common/constants/color";
import { moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";
import { Font } from "../../../common/constants/Font";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },

    card: {
        borderColor: Color.Black,
        borderTopWidth: moderateScale(2),
        borderBottomWidth: moderateScale(2),
        width: "90%"
    },

    header: {
        color: Color.Purple,
        fontFamily: Font.PassionOneBold,
        fontSize: moderateScale(50),
    },

    topWrapper: {
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: verticalScale(20),
        width: "90%",
        display: "flex",
        flexDirection: "row"
    },
});