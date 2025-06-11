import { SpinGameUrlBase } from "@/app/Hub/constants/Endpoints";
import { PagedRequest, PagedResponse } from "@/app/Hub/constants/Types";
import httpResult from "@/app/Hub/services/httpResult";
import SpinGame, { CreateSpinGameRequest } from "../constants/SpinTypes";
import { Result } from "@/app/Hub/utils/result";

export const getGame = async (userId: number, gameId: number): Promise<Result<SpinGame>> => {
  const url = `${SpinGameUrlBase}/user/${userId}/game/${gameId}`;
  return await httpResult.simpleGet(url);
};

export const createGame = async (request: CreateSpinGameRequest): Promise<Result<SpinGame>> => {
  return await httpResult.post<CreateSpinGameRequest, SpinGame>(SpinGameUrlBase, request);
};

export const getGamesPage = async (pagedRequest: PagedRequest): Promise<Result<PagedResponse<SpinGame>>> => {
  const url = `${SpinGameUrlBase}/page`;
  return await httpResult.post<PagedRequest, PagedResponse<SpinGame>>(url, pagedRequest);
};
