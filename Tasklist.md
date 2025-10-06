# Tasklist

## NOTES

- i recreated the auth0 tenatn, login might be broken, fix it.
- Alo of rename issues here also, sorry

## Left off
- Implementing Auth0 integration with AuthProvider
- Implement a handler for if you try to logout but no refresh token, wtf to do then?
- Rotate tokens also needs a return so when it fails if no refresh tokens, so we can logout or so
- SilentLogin funciton is missing
- Make some smart middleware or handler for when 401 or 403 with token attached, try getting a new token, then if the api fails again, display error, if not good
- Cleanup
    - move error handling out, return results?
    - Need state for loggedIn?


## Tasks
- Funker ikke å gå inn på laget spill nå, feil i navigation
- Description på gamebase i fe og be, + opdpater db

- En feil som har kommet med ny modal, kollisjon mellom modal og resten av spingame og askgame

- Modal som viser om du har utdatert app version
- push Varslinger
- Reconnect hvis socket faller av fra FE siden
- Wifi provider inn
- Inaktivate spiller om conneciton ryker, kanskje modal + forsøk å koble seg på igjen
- Hente sider foran og bak for raskere paginering
- auth0 callback må peke til ekte uri i prod

- Ytelse
- Ef core indexer
- Firebase analytics
