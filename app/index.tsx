import { useCallback } from "react";
import HubConnectionProvider from "../src/common/context/HubConnectionProvider";
import GlobalGameProvider from "../src/common/context/GlobalGameProvider";
import ModalProvider from "@/src/common/context/ModalProvider";
import Hub from "@/src/hub/Hub";
import AuthProvider from "../src/common/context/AuthProvider";
import ServiceProvider from "@/src/common/context/ServiceProvider";
import { View, StatusBar, Dimensions } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

export default () => (
  <FontLoader>
    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
    <ServiceProvider>
      <ModalProvider>
        <AuthProvider>
          <GlobalGameProvider>
            <HubConnectionProvider>
              <Hub />
            </HubConnectionProvider>
          </GlobalGameProvider>
        </AuthProvider>
      </ModalProvider>
    </ServiceProvider>
  </FontLoader>
);

const FontLoader = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = Font.useFonts({
    "PassionOne-Regular": require("../src/common/assets/fonts/PassionOne-Regular.ttf"),
    "PassionOne-Bold": require("../src/common/assets/fonts/PassionOne-Bold.ttf"),
    "SpaceMono-Regular": require("../src/common/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ width, height, position: 'absolute', top: 0, left: 0 }} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};
