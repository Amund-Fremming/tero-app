import ActionModalProvider from "./Hub/context/ActionModalProvider";
import ConnectionProvider from "./Hub/context/HubConnectionProvider";
import GlobalContext from "./Hub/context/GlobalProvider";
import InfoModalProvider from "./Hub/context/InfoModalProvider";
import Hub from "./Hub/Hub";

export default () => (
  <ActionModalProvider>
    <InfoModalProvider>
      <GlobalContext>
        <ConnectionProvider>
          <Hub />
        </ConnectionProvider>
      </GlobalContext>
    </InfoModalProvider>
  </ActionModalProvider>
);
