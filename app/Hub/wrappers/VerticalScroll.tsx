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
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "transparent",
      }}
      contentContainerStyle={{
        alignItems: "center",
        gap: verticalScale(10),
      }}
    >
      {children}
    </ScrollView>
  );
};

export default VerticalScroll;
