import Color from "@/src/common/constants/color";
import { moderateScale, verticalScale } from "@/src/common/utils/dimensions";
import { StyleSheet } from "react-native";

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
    }
});