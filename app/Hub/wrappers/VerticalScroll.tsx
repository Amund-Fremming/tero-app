import { ReactNode } from "react";
import { Dimensions, ScrollView } from "react-native";
import { verticalScale } from "../utils/dimensions";

interface HorizontalScrollProps {
  children: ReactNode;
}

const { height } = Dimensions.get("window");

export const VerticalScroll = ({ children }: HorizontalScrollProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      style={{
        width: "100%",
        backgroundColor: "transparent",
        height: height,
      }}
      contentContainerStyle={{
        alignItems: "center",
        gap: verticalScale(15),
        paddingBottom: verticalScale(200),
      }}
    >
      {children}
    </ScrollView>
  );
};

export default VerticalScroll;
