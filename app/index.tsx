import ActionModalProvider from "./Hub/context/ActionModalProvider";
import ConnectionProvider from "./Hub/context/HubConnectionProvider";
import GlobalContext from "./Hub/context/GlobalGameProvider";
import InfoModalProvider from "./Hub/context/InfoModalProvider";
import Hub from "./Hub/Hub";
import UserProvider from "./Hub/context/UserProvider";

export default () => (
  <ActionModalProvider>
    <InfoModalProvider>
      <UserProvider>
        <GlobalContext>
          <ConnectionProvider>
            <Hub />
          </ConnectionProvider>
        </GlobalContext>
      </UserProvider>
    </InfoModalProvider>
  </ActionModalProvider>
);
