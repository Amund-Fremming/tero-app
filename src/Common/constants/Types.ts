export enum UserType {
  Guest,
  Registered
}

export enum Gender {
  Male,
  Female,
  Unknown
}

export interface User {
  id: string,
  username: string,
  auth0_id?: string,
  userType: UserType,
  lastActive?: string,
  gender: Gender,
  email?: string,
  emailVerified?: boolean,
  updated_at: string,
  familyName?: string,
  givenName?: string,
  createdAt?: string,
  birthDate?: string
}

export enum GameType {
  AskGame = "AskGame",
  SpinGame = "SpinGame",
}

export enum GameEntryMode {
  Creator,
  Host,
  Participant,
  Member,
}


