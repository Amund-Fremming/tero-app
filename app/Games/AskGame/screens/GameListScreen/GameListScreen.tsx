import { Pressable, Text, View } from "react-native";
import VerticalScroll from "@/app/Hub/wrappers/VerticalScroll";
import AbsoluteHomeButton from "@/app/Hub/components/AbsoluteHomeButton/AbsoluteHomeButton";
import AskGame from "../../constants/AskTypes";
import { PagedRequest, PagedResponse } from "@/app/Hub/constants/Types";
import { AskGameCard } from "../../components/AskGameCard/AskGameCard";
import { useEffect, useState } from "react";
import { getGamesPage } from "../../services/askGameApi";
import { useModalProvider } from "@/app/Hub/context/ModalProvider";
import styles from "./gameListScreenStyles";

const pageSize = 20;

export const GameListScreen = () => {
  const [pagedResponse, setPagedResponse] = useState<PagedResponse<AskGame> | undefined>(undefined);
  const [pagedRequest, setPagedRequest] = useState<PagedRequest>({
    pageNumber: 1,
    pageSize,
  });

  const { displayErrorModal } = useModalProvider();

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
    const result = await getGamesPage(pagedRequest);
    if (result.isError()) {
      displayErrorModal(result.error);
      return;
    }
    console.log(result.value);
    setPagedResponse(result.value);
  };

  return (
    <View style={styles.container}>
      <VerticalScroll key={pagedResponse?.data.length}>
        <Text style={styles.header}>Velg ett spill</Text>
        {pagedResponse?.data.map((item, index) => (
          <AskGameCard {...item} key={index} />
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
