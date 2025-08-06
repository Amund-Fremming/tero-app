import HubConnectionProvider from "../src/Common/context/HubConnectionProvider";
import GlobalGameProvider from "../src/Common/context/GlobalGameProvider";
import ModalProvider from "../src/Common/context/ModalProvider";
import Hub from "../src/Hub/Hub";
import UserProvider from "../src/Common/context/UserProvider";

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
