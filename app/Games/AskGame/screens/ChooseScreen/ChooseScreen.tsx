import { Text, View } from "react-native";
import styles from "./chooseScreenStyles";
import VerticalScroll from "@/app/Hub/wrappers/VerticalScroll";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Color from "@/app/Hub/constants/Color";
import Screen from "@/app/Hub/constants/Screen";
import AskGame, { AskGameState } from "../../constants/AskTypes";
import { Category } from "@/app/Hub/constants/Types";
import { AskGameCard } from "../../components/AskGameCard/AskGameCard";

var s: AskGame = {
  id: 1,
  universalId: "universal id ..",
  name: "Game 1",
  iterations: 10,
  currentIteration: 0,
  creatorId: 1,
  category: Category.Dirty,
  state: AskGameState.Initialized,
  description: "Lorem ipsum dolor amet...",
  questions: [],
};

const mockData: AskGame[] = [
  {
    id: 1,
    universalId: "universal id ..",
    name: "Game 2",
    iterations: 10,
    currentIteration: 0,
    creatorId: 1,
    category: Category.Dirty,
    state: AskGameState.Initialized,
    description: "Lorem ipsum dolor amet...",
    questions: [],
  },
  {
    id: 1,
    universalId: "universal id ..",
    name: "Game 3",
    iterations: 10,
    currentIteration: 0,
    creatorId: 1,
    category: Category.Dirty,
    state: AskGameState.Initialized,
    description: "Lorem ipsum dolor amet...",
    questions: [],
  },
  {
    id: 1,
    universalId: "universal id ..",
    name: "Game 4",
    iterations: 10,
    currentIteration: 0,
    creatorId: 1,
    category: Category.Dirty,
    state: AskGameState.Initialized,
    description: "Lorem ipsum dolor amet...",
    questions: [],
  },
];

export const ChooseScreen = () => {
  return (
    <View style={styles.container}>
      <VerticalScroll>
        <Text style={styles.header}>Velg ett spill</Text>
        {mockData &&
          mockData.map((item, index) => <AskGameCard {...item} key={index} />)}
      </VerticalScroll>
      <AbsoluteNavButton
        label="Home"
        primary={Color.Beige}
        secondary={Color.White}
        destination={Screen.Home}
      />
    </View>
  );
};

export default ChooseScreen;
