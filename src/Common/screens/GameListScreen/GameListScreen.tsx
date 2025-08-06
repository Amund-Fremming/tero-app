import { Pressable, Text, View } from "react-native";
import styles from "./gameListScreenStyles";
import VerticalScroll from "../../wrappers/VerticalScroll";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import { GameType, PagedRequest, PagedResponse } from "@/src/Common/constants/Types";
import GameCard from "../../components/GameCard/GameCard";
import { useEffect, useState } from "react";
import { getGamesPage } from "../../services/universalGameApi";
import { getSpinGame } from "../../../SpinGame/services/spinGameApi";
import { useModalProvider } from "../../context/ModalProvider";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import { useAuthProvider } from "../../context/AuthProvider";
import SpinScreen from "../../../SpinGame/constants/SpinScreen";
import { useNavigation } from "@react-navigation/native";
import { getAskGame } from "@/src/AskGame/services/askGameApi";
import Screen from "../../constants/Screen";
import { useSpinGameProvider } from "@/src/SpinGame/context/SpinGameProvider";
import { useAskGameProvider } from "@/src/AskGame/context/AskGameProvider";
import AskScreen from "@/src/AskGame/constants/AskScreen";

const pageSize = 20;

export const GameListScreen = () => {
  const navigation: any = useNavigation();
  const { guestId: userId } = useAuthProvider();
  const { setUniversalGameValues, gameType } = useGlobalGameProvider();
  const { setSpinGame } = useSpinGameProvider();
  const { setAskGame } = useAskGameProvider();

  const [pagedResponse, setPagedResponse] = useState<PagedResponse | undefined>(undefined);
  const [pagedRequest, setPagedRequest] = useState<PagedRequest>({
    pageNumber: 1,
    pageSize,
  });

  const { displayErrorModal } = useModalProvider();

  const handlePress = async (gameId: number) => {
    if (!gameId) {
      displayErrorModal("Missing game id");
      return;
    }

    if (gameType == GameType.SpinGame) await handleSpinGamePressed(gameId);
    if (gameType == GameType.AskGame) await handleAskGamePressed(gameId);
  };

  const handleSpinGamePressed = async (gameId: number) => {
    var result = await getSpinGame(userId, gameId);
    if (result.isError()) {
      navigation.navigate(Screen.Home);
      displayErrorModal(result.error);
    }

    const game = result.value;
    setUniversalGameValues({
      gameId: game.id,
      universalGameId: game.universalId,
      gameType: GameType.SpinGame,
      iterations: game.iterations,
    });
    setSpinGame(game);
    navigation.navigate(SpinScreen.Lobby);
  };

  const handleAskGamePressed = async (gameId: number) => {
    var result = await getAskGame(gameId);
    if (result.isError()) {
      navigation.navigate(Screen.Home);
      displayErrorModal(result.error);
    }

    const game = result.value;
    setUniversalGameValues({
      gameId: game.id,
      universalGameId: game.universalId,
      gameType: GameType.SpinGame,
      iterations: game.iterations,
    });
    setAskGame(game);
    navigation.navigate(AskScreen.Lobby);
  };

  const handlePaginate = (paginate: -1 | 1) => {
    const request = {
      pageNumber: !pagedResponse ? 1 : pagedResponse?.currentPage + paginate,
      pageSize,
    };
    getGames(request);
    setPagedRequest(request);
  };

  useEffect(() => {
    getGames(pagedRequest);
  }, []);

  const getGames = async (pagedRequest: PagedRequest) => {
    const result = await getGamesPage(gameType, pagedRequest);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    setPagedResponse(result.value);
  };

  return (
    <View style={styles.container}>
      <VerticalScroll key={pagedResponse?.data.length}>
        <Text style={styles.header}>Velg ett spill</Text>
        {pagedResponse?.data.map((item, index) => (
          <GameCard gameBase={item} handlePress={() => handlePress(item.id)} key={index} />
        ))}
        <View style={styles.navButtons}>
          {pagedResponse?.hasPrevPage && (
            <Pressable style={styles.button} onPress={() => handlePaginate(-1)}>
              <Text style={styles.buttonLabel}>Forrige</Text>
            </Pressable>
          )}
          {!pagedResponse ||
            (pagedResponse.hasNextPage && (
              <Pressable style={styles.button} onPress={() => handlePaginate(+1)}>
                <Text style={styles.buttonLabel}>Neste</Text>
              </Pressable>
            ))}
        </View>
        <View>
          {pagedResponse && (
            <Text style={styles.paragraph}>
              Side {pagedResponse?.currentPage} / {pagedResponse?.pageCount}
            </Text>
          )}
        </View>
      </VerticalScroll>
      <AbsoluteHomeButton />
    </View>
  );
};

export default GameListScreen;
