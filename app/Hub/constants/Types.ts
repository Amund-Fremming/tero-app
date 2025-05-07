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
  lastActive: Date;
}

export interface RegisteredUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface AddedToGameResult {
  gameType: GameType;
  gameId: string;
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
