import { UniversalGameUrlBase } from "../constants/Endpoints";
import { AddedToGameResult } from "../constants/Types";
import { Result } from "neverthrow";
import httpResult from "./HttpResult";

export const addPlayerToGame = async (
  userId: number,
  universalGameId: number
): Promise<Result<AddedToGameResult, string>> => {
  const url = `${UniversalGameUrlBase}?userId=${userId}&universalGameId=${universalGameId}`;
  return await httpResult.simplePost<AddedToGameResult>(url);
};
