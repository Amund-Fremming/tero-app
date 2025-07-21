import { Category, UserBase, GameBase } from "@/app/Common/constants/Types";

export interface SpinGame extends GameBase {
  category: Category;
  state: SpinGameState;
  hubGroupName: string;
  hostId: number;
  Host: UserBase | undefined;
  players: SpinPlayer[];
  challenges: Challenge[];
}

export interface SpinPlayer {
  id: number;
  gameId: number;
  userId: number;
  active: boolean;
  spinGame: SpinGame;
  user: UserBase;
}

export interface Challenge {
  id: number;
  gameId: number;
  participants: number;
  text: string;
  readBeforeSpin: boolean;
}

export interface CreateSpinGameRequest {
  userId: number;
  name: string;
  category?: Category;
}

export enum SpinGameState {
  Initialized,
  ChallengesClosed,
  RoundStarted,
  Spinning,
  RoundFinished,
  Finished,
}

export default SpinGame;
