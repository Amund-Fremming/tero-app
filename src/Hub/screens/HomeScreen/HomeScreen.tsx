import { View, Text, Pressable, Button } from "react-native";
import Screen from "../../../common/constants/screen";
import styles from "./homeScreenStyles";
import { ClientPopup, GameEntryMode } from "../../../common/constants/types";
import { useGlobalGameProvider } from "../../../common/context/GlobalGameProvider";
import { useEffect, useState } from "react";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";
import { useModalProvider } from "@/src/common/context/ModalProvider";

const subHeaderList = [
  "lorem ipsum dolor amet",
  "consectetur adipiscing elit",
  "sed do eiusmod tempor",
  "incididunt ut labore et",
  "dolore magna aliqua ut",
  "enim ad minim veniam",
  "quis nostrud exercitation"
];


export const HomeScreen = ({ navigation }: any) => {
  const { setGameEntryMode } = useGlobalGameProvider();
  const { commonService, userService } = useServiceProvider();
  const { displayInfoModal } = useModalProvider();

  const [subHeader, setSubheader] = useState<string>("");
  const [popupCloseCount, setPopupCloseCount] = useState<number>(0);

  useEffect(() => {
    setSubHeader();
    systemHealth();
    getClientPopup();
  }, []);

  const getClientPopup = async () => {
    if (popupCloseCount >= 2) {
      console.error("Skipping modal");
      return;
    }

    const result = await userService().getGlobalPopup();
    if (result.isError()) {
      // TODO - add audit
      console.error(result.error);
      return;
    }

    const popup = result.value;
    if (!popup.active) {
      return;
    }

    displayInfoModal(popup.paragraph, popup.heading, () => setPopupCloseCount(prev => prev + 1));
  }

  const setSubHeader = () => {
    const idx = Math.floor(Math.random() * subHeaderList.length);
    setSubheader(subHeaderList[idx]);
  }

  const systemHealth = async () => {
    const result = await commonService().healthDetailed();
    if (result.isError()) {
      console.error("Failed health, returning error page");
      navigation.navigate(Screen.Error);
    }

    /* TODO  -  UNCOMMENT
    let status = result.value;
    if (!status.database || !status.session || !status.platform) {
      console.error("Failed health, returning error page");
      navigation.navigate(Screen.Error);
    }*/
  }

  const handlePress = (gameEntryMode: GameEntryMode, destination: Screen) => {
    setGameEntryMode(gameEntryMode);
    navigation.navigate(destination);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Text style={styles.header}>tero</Text>
        <Text style={styles.subHeader}>{subHeader}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.topLeft }}
          onPress={() => handlePress(GameEntryMode.Creator, Screen.GameTypeList)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textTopLeft }}>Lag</Text>
            <Text style={{ ...styles.textBase, ...styles.textTopLeft }}>spill</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.bottomLeft }}
          onPress={() => navigation.navigate(Screen.Hub)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textBottomLeft }}>Til</Text>
            <Text style={{ ...styles.textBase, ...styles.textBottomLeft }}>hub</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.topRight }}
          onPress={() => handlePress(GameEntryMode.Host, Screen.GameTypeList)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textTopRight }}>Velg</Text>
            <Text style={{ ...styles.textBase, ...styles.textTopRight }}>spill</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ ...styles.buttonBase, ...styles.bottomRight }}
          onPress={() => handlePress(GameEntryMode.Participant, Screen.Join)}
        >
          <View style={styles.buttonTextWrapper}>
            <Text style={{ ...styles.textBase, ...styles.textBottomRight }}>Bli</Text>
            <Text style={{ ...styles.textBase, ...styles.textBottomRight }}>med</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
