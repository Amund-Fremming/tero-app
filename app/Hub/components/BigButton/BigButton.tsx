import { Text, TouchableOpacity } from "react-native";
import { styles } from "./bigButtonStyles";
import { Colors } from "../../assets/constants/Colors";

interface IBigButton {
  text: string;
  color: string;
  onClick: () => void;
  inverted?: boolean;
}

export const BigButton = ({
  text,
  color,
  onClick,
  inverted = false,
}: IBigButton) => {
  const getButtonStyles = () => {
    if (inverted) {
      return {
        ...styles.container,
        backgroundColor: Colors.White,
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
      return { ...styles.text, color: Colors.White };
    }
  };

  return (
    <TouchableOpacity onPress={onClick} style={getButtonStyles()}>
      <Text style={getTextStyles()}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BigButton;
