import HubConnectionProvider from "./Common/context/HubConnectionProvider";
import GlobalGameProvider from "./Common/context/GlobalGameProvider";
import ModalProvider from "./Common/context/ModalProvider";
import Hub from "./Hub/Hub";
import UserProvider from "./Common/context/UserProvider";
import { Auth0Provider } from "react-native-auth0";

const AUTH0_DOMAIN = "dev-8gif55bqfum82z1v.us.auth0.com";
const AUTH0_CLIENT_ID = "8XF85icFfdDejkrewfsFtOg5kfj6LqG8";

export default () => (
  <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID} >
  <ModalProvider>
    <UserProvider>
      <GlobalGameProvider>
        <HubConnectionProvider>
          <Hub />
        </HubConnectionProvider>
      </GlobalGameProvider>
    </UserProvider>
 </ModalProvider >
  </Auth0Provider>
);
