import ActionModalProvider from "./Hub/context/ActionModalProvider";
import GlobalContext from "./Hub/context/GlobalProvider";
import InfoModalProvider from "./Hub/context/InfoModalProvider";
import Hub from "./Hub/Hub";

export default () => (
  <ActionModalProvider>
    <InfoModalProvider>
      <GlobalContext>
        <Hub />
      </GlobalContext>
    </InfoModalProvider>
  </ActionModalProvider>
);
