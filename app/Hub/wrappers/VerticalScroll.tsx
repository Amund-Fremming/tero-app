import { ReactNode } from "react";
import { ScrollView } from "react-native";
import { verticalScale } from "../utils/dimensions";

interface HorizontalScrollProps {
  children: ReactNode;
}

export const VerticalScroll = ({ children }: HorizontalScrollProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "transparent",
        paddingBottom: verticalScale(100),
      }}
      contentContainerStyle={{
        minHeight: "100%",
        alignItems: "center",
        gap: verticalScale(15),
      }}
    >
      {children}
    </ScrollView>
  );
};

export default VerticalScroll;
