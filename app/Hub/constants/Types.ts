export interface GameBase {
  id: number;
  universalId: string;
  name: string;
  iterations: number;
  currentIteration: number;
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
  gameId: number;
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

export interface CreateGameResponse {
  gameId: number;
  universalGameId: number;
}
