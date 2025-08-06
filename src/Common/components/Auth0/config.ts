import * as AuthSession from "expo-auth-session";

interface IAuth0Config {
    domain: string,
    clientId: string,
    redirectUri: string
}

export const Auth0Config: IAuth0Config =  {
    domain: "dev-8gif55bqfum82z1v.us.auth0.com",
    clientId: "8XF85icFfdDejkrewfsFtOg5kfj6LqG8",
    redirectUri: AuthSession.makeRedirectUri({ scheme: "com.tero" })
}