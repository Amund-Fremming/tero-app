import { UniversalGameUrlBase } from "../../Common/constants/Endpoints";
import { AddedToGameResult, GameType, PagedRequest, PagedResponse } from "../../Common/constants/Types";
import { Result } from "../../Common/utils/result";
import httpResult from "./httpResult";

export const addPlayerToGame = async (userId: number, universalGameId: number): Promise<Result<AddedToGameResult>> => {
  const url = `${UniversalGameUrlBase}?userId=${userId}&universalGameId=${universalGameId}`;
  return await httpResult.simplePost<AddedToGameResult>(url);
};

export const getGamesPage = async (gameType: GameType, pagedRequest: PagedRequest): Promise<Result<PagedResponse>> => {
  const url = `${UniversalGameUrlBase}/page?gameType=${gameType}`;
  return await httpResult.get(url, pagedRequest);
};
