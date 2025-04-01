import { NavigationContainer } from "@react-navigation/native";
import { NavigationIndependentTree } from "@react-navigation/native";

import App from "./App/App";

export default () => (
  <NavigationIndependentTree>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </NavigationIndependentTree>
);
