import GameBase, { Category } from "@/app/Hub/constants/Types";

export interface AskGame extends GameBase {
  creatorId: number;
  category: Category;
  state: AskGameState;
  description: string;
  questions: Question[];
}

export interface Question {
  id: number;
  askGameId: number;
  text: string;
  active: boolean;
}

export enum AskGameState {
  Initialized,
  Closed,
}

export interface CreateAskGameRequest {
  userId: number;
  gameName: string;
  description: string;
  category: Category;
}

export default AskGame;
