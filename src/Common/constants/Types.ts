export interface GameBase {
  id: number;
  universalId: number;
  name: string;
  iterations: number;
  currentIteration: number;
  isCopy: boolean;
}

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

export interface AddedToGameResult {
  gameType: GameType;
  gameBase: GameBase;
}

export enum Category {
  Random,
  Friendly,
  Dirty,
  Flirty,
  ForTheBoys,
  ForTheGirls,
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

export interface PagedRequest {
  pageNumber: number;
  pageSize: number;
  skip?: number;
  take?: number;
}

export interface PagedResponse {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  data: Array<GameBase>;
  pageCount: number;
  hasNextPage: number;
  hasPrevPage: number;
}

export interface UniversalGameValues {
  gameId: number;
  universalGameId: number;
  gameType: GameType;
  iterations: number;
}
