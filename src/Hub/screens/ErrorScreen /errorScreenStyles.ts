import { StyleSheet } from "react-native";
import { moderateScale } from "@/src/common/utils/dimensions";
import Colors from "../../../common/constants/color";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: Colors.LightGray,
        justifyContent: "space-between",
        alignItems: "center",
    },
})