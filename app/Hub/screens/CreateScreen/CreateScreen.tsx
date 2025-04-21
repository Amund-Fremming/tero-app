import { View, Text } from "react-native";
import styles from "./createScreenStyles";
import AbsoluteNavButton from "../../components/AbsoluteNavButton/AbsoluteNavButton";
import Screen from "../../constants/Screen";
import Colors from "../../constants/Color";
import items from "./CreateData.json";
import GameCard from "../../components/GameCard/GameCard";

export const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>Velg spill type</Text>
      </View>

      {items &&
        items.map((item, index) => (
          <GameCard
            header={item.name}
            description={item.description}
            icon={item.icon}
          />
        ))}

      <AbsoluteNavButton
        label="Hjem"
        destination={Screen.Home}
        primary={Colors.White}
        secondary={Colors.Red}
      />
    </View>
  );
};

export default CreateScreen;
