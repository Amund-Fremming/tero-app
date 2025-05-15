import { Text, View } from "react-native";
import styles from "./chooseScreenStyles";
import VerticalScroll from "@/app/Hub/wrappers/VerticalScroll";
import AbsoluteNavButton from "@/app/Hub/components/AbsoluteNavButton/AbsoluteNavButton";
import Color from "@/app/Hub/constants/Color";
import Screen from "@/app/Hub/constants/Screen";
import AskGame from "../../constants/AskTypes";
import { PagedRequest } from "@/app/Hub/constants/Types";
import { AskGameCard } from "../../components/AskGameCard/AskGameCard";
import { useEffect, useState } from "react";
import { getGamesPage } from "../../services/askGameApi";
import { useInfoModalProvider } from "@/app/Hub/context/InfoModalProvider";

export const ChooseScreen = () => {
  const [games, setGames] = useState<Array<AskGame>>([]);

  const { displayErrorModal } = useInfoModalProvider();

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    const request: PagedRequest = {
      pageNumber: 2,
      pageSize: 20,
    };

    const result = await getGamesPage(request);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    setGames(result.value.data);
  };

  return (
    <View style={styles.container}>
      <VerticalScroll key={games.length}>
        <Text style={styles.header}>Velg ett spill</Text>
        {games.map((item, index) => (
          <AskGameCard {...item} key={index} />
        ))}
      </VerticalScroll>
      <AbsoluteNavButton label="Hjem" destination={Screen.Home} primary={Color.White} secondary={Color.Red} />
    </View>
  );
};

export default ChooseScreen;
