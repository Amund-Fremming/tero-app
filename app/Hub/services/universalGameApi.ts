import { UniversalGameUrlBase } from "../constants/Endpoints";
import { AddedToGameResult } from "../constants/Types";
import { Result } from "../utils/result";
import httpResult from "./httpResult";

export const addPlayerToGame = async (userId: number, universalGameId: number): Promise<Result<AddedToGameResult>> => {
  const url = `${UniversalGameUrlBase}?userId=${userId}&universalGameId=${universalGameId}`;
  return await httpResult.simplePost<AddedToGameResult>(url);
};
