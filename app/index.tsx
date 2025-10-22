import HubConnectionProvider from "../src/common/context/HubConnectionProvider";
import GlobalGameProvider from "../src/common/context/GlobalGameProvider";
import ModalProvider from "@/src/common/context/ModalProvider";
import Hub from "@/src/hub/Hub";
import AuthProvider from "../src/common/context/AuthProvider";
import ServiceProvider from "@/src/common/context/ServiceProvider";

export default () => (
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
);
