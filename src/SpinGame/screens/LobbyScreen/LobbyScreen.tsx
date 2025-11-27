import { View, Text } from "react-native";
import styles from "./lobbyScreenStyles";
import AbsoluteHomeButton from "@/src/Common/components/AbsoluteHomeButton/AbsoluteHomeButton";
import { useGlobalGameProvider } from "@/src/Common/context/GlobalGameProvider";
import { Pressable } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useHubConnectionProvider } from "@/src/Common/context/HubConnectionProvider";
import { HubChannel } from "@/src/Common/constants/HubChannel";
import { useModalProvider } from "@/src/Common/context/ModalProvider";
import Screen from "@/src/Common/constants/Screen";
import { GameEntryMode } from "@/src/Common/constants/Types";
import { useAuthProvider } from "@/src/Common/context/AuthProvider";
import SpinGame from "../../SpinGame";
import AddChallenge from "../../components/AddChallenge/AddChallenge";

export const LobbyScreen = ({ navigation }: any) => {
  const { pseudoId: userId } = useAuthProvider();
  const { connect, disconnect, setListener, invokeFunction } = useHubConnectionProvider();
  const { displayErrorModal } = useModalProvider();

  return <View style={styles.container}></View>;
};

export default LobbyScreen;
