import App from "./App/App";
import ActionModalProvider from "./App/context/ActionModalProvider";
import GlobalContext from "./App/context/GlobalProvider";
import InfoModalProvider from "./App/context/InfoModalProvider";

export default () => (
  <ActionModalProvider>
    <InfoModalProvider>
      <GlobalContext>
        <App />
      </GlobalContext>
    </InfoModalProvider>
  </ActionModalProvider>
);
