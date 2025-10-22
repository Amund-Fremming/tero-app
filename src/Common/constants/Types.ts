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
  Quiz = "Quiz",
  Spin = "Spin",
}

export interface CreateGameRequest {
  name: string,
  description?: string,
  category?: GameCategory,
}

export enum GameCategory {
  Casual,
  Random,
  Ladies,
  Boys,
  Default,
}

export interface InteractiveGameResponse {
  key_word: string,
  hub_address: string,
}

export enum GameEntryMode {
  Creator,
  Host,
  Participant,
  Member,
}

export interface PagedResponse<T> {
  items: T[],
  has_next: boolean
}

export interface GamePageQuery {
  page_num: number;
  game_type: GameType;
  category: GameCategory | null;
}

export interface SavedGamesPageQuery {
  pageNum: number
}

export interface GameBase {
  id: string,
  name: string,
  description?: string,
  gameType: GameType,
  category: GameCategory,
  iterations: number,
  timesPlayed: number,
  lastPlayed: string,
}
