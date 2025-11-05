import { useCallback } from "react";
import HubConnectionProvider from "../src/common/context/HubConnectionProvider";
import GlobalGameProvider from "../src/common/context/GlobalGameProvider";
import ModalProvider from "@/src/common/context/ModalProvider";
import Hub from "@/src/hub/Hub";
import AuthProvider from "../src/common/context/AuthProvider";
import ServiceProvider from "@/src/common/context/ServiceProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

export default () => (
  <FontLoader>
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

  return <SafeAreaProvider onLayout={onLayoutRootView}>{children}</SafeAreaProvider>;
};
