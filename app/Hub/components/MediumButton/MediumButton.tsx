import { Text, TouchableOpacity } from "react-native";
import { styles } from "./mediumButtonStyles";
import { Color } from "../../constants/Color";

interface IMediumButton {
  text: string;
  color: string;
  onClick: () => void;
  inverted?: boolean;
}

export const MediumButton = ({
  text,
  color,
  onClick,
  inverted = false,
}: IMediumButton) => {
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

export default MediumButton;
