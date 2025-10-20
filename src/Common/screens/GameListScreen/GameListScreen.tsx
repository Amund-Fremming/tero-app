import { Pressable, Text, View } from "react-native";
import VerticalScroll from "../../wrappers/VerticalScroll";
import AbsoluteHomeButton from "../../components/AbsoluteHomeButton/AbsoluteHomeButton";
import GameCard from "../../components/GameCard/GameCard";
import { useEffect, useState } from "react";
import { useModalProvider } from "../../context/ModalProvider";
import { useGlobalGameProvider } from "@/src/common/context/GlobalGameProvider";
import { useAuthProvider } from "../../context/AuthProvider";
import SpinScreen from "@/src/spinGame/constants/spinScreen";
import { useNavigation } from "@react-navigation/native";
import { useSpinGameProvider } from "@/src/spinGame/context/SpinGameProvider";
import { useAskGameProvider } from "@/src/quizGame/context/AskGameProvider";
import styles from "./gameListScreenStyles";

export const GameListScreen = () => {
  const navigation: any = useNavigation();
  const { setUniversalGameValues, gameType } = useGlobalGameProvider();
  const { setSpinGame } = useSpinGameProvider();
  const { setAskGame } = useAskGameProvider();


  return (
    <View style={styles.container}>
      <VerticalScroll key={/*pagedResponse?.data.length*/1}>
        <Text style={styles.header}>Velg ett spill</Text>

        <View style={styles.navButtons}>
          {/*pagedResponse?.hasPrevPage && (
            <Pressable style={styles.button} onPress={() => { }}>
              <Text style={styles.buttonLabel}>Forrige</Text>
            </Pressable>
          )*/}
          {/*!pagedResponse ||
            (pagedResponse.hasNextPage && (
              <Pressable style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonLabel}>Neste</Text>
              </Pressable>
            ))*/}
        </View>
        <View>

          {/*pagedResponse && (
            <Text style={styles.paragraph}>
              Side {pagedResponse?.currentPage} / {pagedResponse?.pageCount}
            </Text>
          )*/}
        </View>
      </VerticalScroll>
      <AbsoluteHomeButton />
    </View>
  );
};

export default GameListScreen;
