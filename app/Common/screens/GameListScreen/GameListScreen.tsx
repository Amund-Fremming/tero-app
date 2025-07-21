import { Pressable, Text, View } from "react-native";
import styles from "./gameListScreenStyles";
import VerticalScroll from "../../wrappers/VerticalScroll";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import { GameType, PagedRequest, PagedResponse } from "@/app/Common/constants/Types";
import GameBaseCard from "../../components/AskGameCard/GameBaseCard";
import { useEffect, useState } from "react";
import { getGamesPage } from "../../services/universalGameApi";
import { getGame } from "../../../SpinGame/services/spinGameApi";
import { useModalProvider } from "../../context/ModalProvider";
import { useGlobalGameProvider } from "@/app/Common/context/GlobalGameProvider";
import { useUserProvider } from "../../context/UserProvider";
import SpinScreen from "../../../SpinGame/constants/SpinScreen";
import { useNavigation } from "@react-navigation/native";

const pageSize = 20;

interface GameListScreenProps {
  gameType: GameType;
}

export const GameListScreen = ({ gameType }: GameListScreenProps) => {
  const navigation: any = useNavigation();
  const { userId } = useUserProvider();
  const { setUniversalGameValues } = useGlobalGameProvider();

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

    var result = await getGame(userId, gameId);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }

    const game = result.value;
    setUniversalGameValues({
      gameId: game.id,
      universalGameId: game.universalId,
      gameType: GameType.SpinGame,
      iterations: game.iterations,
    });
    navigation.navigate(SpinScreen.Lobby);
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
          <GameBaseCard gameBase={item} handlePress={() => handlePress(item.id)} key={index} />
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
