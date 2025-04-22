import { Text, TouchableOpacity } from "react-native";

import { styles } from "./smallButtonStyles";
import { Color } from "../../constants/Color";

interface ISmallButton {
  text: string;
  color: string;
  inverted: boolean;
  onClick: () => void;
}

export const SmallButton = ({
  text,
  color,
  onClick,
  inverted = false,
}: ISmallButton) => {
  const getButtonStyles = () => {
    if (inverted) {
      return {
        ...styles.container,
        backgroundColor: Color.White,
        borderColor: color,
        borderWidth: 2,
      };
    } else {
      return { ...styles.container, backgroundColor: color };
    }
  };

  const getTextStyles = () => {
    if (inverted) {
      return { ...styles.text, color: color };
    } else {
      return { ...styles.text, color: Color.White };
    }
  };

  return (
    <TouchableOpacity onPress={onClick} style={getButtonStyles()}>
      <Text style={getTextStyles()}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;
