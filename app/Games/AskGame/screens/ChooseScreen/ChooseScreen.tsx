import { Text, View } from "react-native";
import styles from "./chooseScreenStyles";
import VerticalScroll from "@/app/Hub/wrappers/VerticalScroll";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Color from "@/app/Hub/constants/Color";
import Screen from "@/app/Hub/constants/Screen";
import AskGame, { AskGameState } from "../../constants/AskTypes";
import { Category, PagedRequest } from "@/app/Hub/constants/Types";
import { AskGameCard } from "../../components/AskGameCard/AskGameCard";
import { useEffect, useState } from "react";
import { getGamesPage } from "../../services/askGameApi";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";

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
  const [games, setGames] = useState<Array<AskGame>>([]);

  const { displayErrorModal } = useInfoModalProvider();

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    const request: PagedRequest = {
      pageNumber: 1,
      pageSize: 20,
      skip: 0,
      take: 0,
    };

    const result = await getGamesPage(request);
    if (result.isErr()) {
      displayErrorModal(result.error);
      return;
    }

    setGames(result.value.data);
  };

  return (
    <View style={styles.container}>
      <VerticalScroll>
        <Text style={styles.header}>Velg ett spill</Text>
        {games.map((item, index) => (
          <AskGameCard {...item} key={index} />
        ))}
      </VerticalScroll>
      <AbsoluteNavButton label="Home" primary={Color.Beige} secondary={Color.White} destination={Screen.Home} />
    </View>
  );
};

export default ChooseScreen;
