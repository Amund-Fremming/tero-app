import HubConnectionProvider from "../src/Common/context/HubConnectionProvider";
import GlobalGameProvider from "../src/Common/context/GlobalGameProvider";
import ModalProvider from "../src/Common/context/ModalProvider";
import Hub from "../src/Hub/Hub";
import AuthProvider from "../src/Common/context/AuthProvider";

export default () => (
  <ModalProvider>
    <AuthProvider>
      <GlobalGameProvider>
        <HubConnectionProvider>
          <Hub />
        </HubConnectionProvider>
      </GlobalGameProvider>
    </AuthProvider>
  </ModalProvider>
);
