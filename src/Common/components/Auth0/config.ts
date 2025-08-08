import * as AuthSession from "expo-auth-session";

const CLIENT_ID = "8XF85icFfdDejkrewfsFtOg5kfj6LqG8";
const DOMAIN = "dev-8gif55bqfum82z1v.us.auth0.com";
const SCHEME = "com.tero";
const AUDIENCE = "https://api.tero.com";

interface IAuth0Config {
    domain: string,
    clientId: string,
    audience: string,
    redirectUri: string,
    discovery: IDiscovery
}

interface IDiscovery {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    revocationEndpoint: string;
}

const discovery: IDiscovery = {
  authorizationEndpoint: `https://${DOMAIN}/authorize`,
  tokenEndpoint: `https://${DOMAIN}/oauth/token`,
  revocationEndpoint: `https://${DOMAIN}/oauth/revoke`,
};

export const Auth0Config: IAuth0Config = {
    domain: DOMAIN,
    clientId: CLIENT_ID,
    audience: AUDIENCE,
    redirectUri: AuthSession.makeRedirectUri({ scheme: SCHEME}),
    discovery
}