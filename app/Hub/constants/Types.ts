export interface GameBase {
  id: number;
  universalId: number;
  name: string;
  iterations: number;
  currentIteration: number;
  isCopy: boolean;
}

export interface UserBase {
  id: number;
  guid: string;
  lastActive: string;
}

export interface RegisteredUserRequest {
  name: string;
  email: string;
  password: string;
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

export interface PagedResponse<T> {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  data: Array<T>;
  pageCount: number;
  hasNextPage: number;
  hasPrevPage: number;
}
