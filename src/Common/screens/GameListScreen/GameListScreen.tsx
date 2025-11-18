import { Pressable, Text, View } from "react-native";
import VerticalScroll from "../../wrappers/VerticalScroll";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useEffect, useState } from "react";
import { useModalProvider } from "../../context/ModalProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import { useAuthProvider } from "../../context/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { useSpinGameProvider } from "@/src/spinGame/context/SpinGameProvider";
import { useQuizGameProvider } from "@/src/quizGame/context/AskGameProvider";
import styles from "./gameListScreenStyles";
import { useServiceProvider } from "../../context/ServiceProvider";
import { GameBase, GameCategory, GamePageQuery, PagedResponse } from "../../constants/types";
import Screen from "../../constants/screen";

export const GameListScreen = () => {
  const navigation: any = useNavigation();

  const { displayErrorModal, displayActionModal } = useModalProvider();
  const { pseudoId, accessToken } = useAuthProvider();
  const { setUniversalGameValues, gameType } = useGlobalGameProvider();
  const { gameService } = useServiceProvider();

  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(0);
  const [category, setCategory] = useState<GameCategory | null>(null);
  const [games, setGames] = useState<GameBase[]>([]);

  useEffect(() => {
    getPage(0);
  }, []);

  const handleNextPage = async () => {
    if (!hasNext) {
      return
    }

    const page = pageNum + 1;
    setPageNum(page);
    setHasPrev(true)
    await getPage(page);
  }

  const handlePrevPage = async () => {
    if (pageNum == 0) {
      return;
    }

    if (pageNum == 1) {
      setHasPrev(false)
    }

    const page = pageNum - 1;
    setPageNum(page);
    await getPage(page);
  }

  const createPageQuery = (pageNum: number): GamePageQuery => {
    return {
      page_num: pageNum,
      game_type: gameType,
      category: category
    }
  }

  const getPage = async (pageNum: number) => {
    if (!pseudoId) {
      console.error("No user id");
      return;
    }

    const request = createPageQuery(pageNum);
    const result = await gameService().getGamePage<GameBase>(pseudoId, request);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    const pagedResponse: PagedResponse<GameBase> = result.value;

    console.log("has next:", pagedResponse.has_next);
    setGames(pagedResponse.items);
    setHasNext(pagedResponse.has_next);
  }

  const handleSaveGame = async (gameId: string) => {
    if (!accessToken) {
      displayActionModal("Vil du logge inn for å lagre spill?", () => { }, () => navigation.navigate(Screen.Profile))
      return;
    }

    const result = await gameService().saveGame(accessToken, gameId);
    if (result.isError()) {
      displayErrorModal("Det har skjedd en feil, forsøk igjen senere");
    }
  }

  const { setSpinGame } = useSpinGameProvider();
  const { setQuizGame } = useQuizGameProvider();

  return (
    <View style={styles.container}>
      <VerticalScroll>
        <Text style={styles.header}>Velg ett spill</Text>


        {games.length === 0 && <Text>Det finnes ingen spill av denne typen enda</Text>}

        {games.map((game) => (
          <Pressable key={game.id}>
            <Text style={styles.cardHeader}>{game.name}</Text>
            <Text style={styles.cardDescription}>{game.description}</Text>
            <Text style={styles.cardCategory}>{game.category}</Text>
            <Pressable onPress={() => handleSaveGame(game.id)} >
              <Text>Lagre</Text>
            </Pressable>
          </Pressable>
        ))}


        <View style={styles.navButtons}>
          {hasPrev && (
            <Pressable style={styles.button} onPress={handlePrevPage}>
              <Text style={styles.buttonLabel}>Forrige</Text>
            </Pressable>
          )}
          {hasNext && (
            <Pressable style={styles.button} onPress={handleNextPage}>
              <Text style={styles.buttonLabel}>Neste</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.paragraph}>
          Side {pageNum}
        </Text>
      </VerticalScroll>

      <AbsoluteHomeButton />
    </View>
  );
};

export default GameListScreen;
