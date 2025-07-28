import HubConnectionProvider from "./Common/context/HubConnectionProvider";
import GlobalGameProvider from "./Common/context/GlobalGameProvider";
import ModalProvider from "./Common/context/ModalProvider";
import Hub from "./Hub/Hub";
import UserProvider from "./Common/context/UserProvider";

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
