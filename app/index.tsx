import HubConnectionProvider from "./Hub/context/HubConnectionProvider";
import GlobalGameProvider from "./Hub/context/GlobalGameProvider";
import ModalProvider from "./Hub/context/ModalProvider";
import Hub from "./Hub/Hub";
import UserProvider from "./Hub/context/UserProvider";

export default () => (
  <ModalProvider>
    <UserProvider>
      <GlobalGameProvider>
        <HubConnectionProvider>
          <Hub />
        </HubConnectionProvider>
      </GlobalGameProvider>
    </UserProvider>
  </ModalProvider>
);
