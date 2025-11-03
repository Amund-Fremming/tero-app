import { View, Text, Pressable } from "react-native";
import { styles } from "./savedGameScreenStyles";
import AbsoluteHomeButton from "@/src/common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import VerticalScroll from "@/src/common/wrappers/VerticalScroll";
import { useEffect, useState } from "react";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { GameBase } from "@/src/common/constants/types";

export const SavedGamesScreen = () => {
    const { gameService } = useServiceProvider();
    const { guestId, accessToken } = useAuthProvider();
    const { displayErrorModal } = useModalProvider();

    const [games, setGames] = useState<GameBase[] | undefined>(undefined);
    const [hasNext, setHasNext] = useState<boolean>(false);
    const [pageNum, setPageNum] = useState<number>(0);

    const hasPrev = () => pageNum > 0;

    useEffect(() => {
        fetchSavedGames();
    }, []);

    const handleUnsavePressed = async (game: GameBase) => {
        setGames((prev) => (prev?.filter(g => g.id != game.id)));
        await gameService().unsaveGame(guestId, accessToken, game.id);
    }

    const fetchSavedGames = async () => {
        const result = await gameService().getSavedGames(guestId, accessToken, pageNum);
        if (result.isError()) {
            displayErrorModal(result.error);
            return;
        }

        const page = result.value;
        setGames(page.items);
    }

    return (
        <VerticalScroll>
            <Text>Lagrede spill</Text>

            {games && (
                games.map(game => (
                    <View style={styles.card} key={game.id}>
                        <Text>{game.name}</Text>
                        <Text>{game.description}</Text>
                        <Text>{game.gameType}</Text>
                        <Pressable onPress={() => handleUnsavePressed(game)}>
                            <Text>fjern</Text>
                        </Pressable>
                    </View>
                ))
            )}

            <AbsoluteHomeButton />
        </VerticalScroll >
    );
}