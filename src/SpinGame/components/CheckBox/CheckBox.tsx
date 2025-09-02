import { Pressable } from "react-native";
import { styles } from "./checkBoxStyles";
import { useState } from "react";
import Color from "@/src/common/constants/color";

interface CheckBoxProps {
  checked: boolean;
  onCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckBox = ({ checked, onCheck }: CheckBoxProps) => {
  const [color, setColor] = useState<string>(checked ? Color.Green : Color.Red);

  const handleCheckBox = () => {
    if (color === Color.Red) {
      setColor(Color.Green);
      return;
    }

    setColor(Color.Red);
  };

  return <Pressable onPress={handleCheckBox} style={{ ...styles.box, backgroundColor: color }}></Pressable>;
};

export default CheckBox;
